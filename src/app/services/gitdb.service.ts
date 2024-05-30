/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Hero, HeroJSON } from '../domain/hero';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  debounceTime,
  firstValueFrom,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
  tap,
  zipWith, combineLatestWith
} from 'rxjs';
import {atob, Base64} from "js-base64";

declare let GitHub: any;

export const LATEST_COMMIT = 'latest_commit';

@Injectable({
  providedIn: 'root'
})
export class GitdbService {
  private static readonly TOKEN: string = 'auth-token';
  private static readonly USERNAME: string = 'username';

  readonly TIMEOUT = 5000;

  private gh: any;
  private latestCommit: string | null = null;
  private repo: any;

  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject('');
  token$: Observable<string> = this.tokenSubject.asObservable();

  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject('');
  username$: Observable<string> = this.usernameSubject.asObservable();

  private updateSubject: Subject<Hero> = new Subject();
  update$ = this.updateSubject.asObservable();

  private saveSubject: Subject<boolean> = new BehaviorSubject(false);
  saving$ = this.saveSubject.asObservable();

  private heroCacheSubject: ReplaySubject<Hero[] | null> = new ReplaySubject(1);
  private heroCache$ = this.heroCacheSubject.asObservable();

  constructor(private readonly route: Router) {
    this.token$.subscribe((token) => {
      this.gh = new GitHub({
        token: token
      });
    });

    const token = sessionStorage.getItem(GitdbService.TOKEN);
    if (token !== undefined && token !== null) {
      this.tokenSubject.next(token);
    }

    const user = sessionStorage.getItem(GitdbService.USERNAME);
    if (user !== undefined && user !== null) {
      this.usernameSubject.next(user);
    }

    this.heroCacheSubject.next(null);

    this.update$.pipe(debounceTime(this.TIMEOUT)).subscribe((hero) => {
      this.saveHero(hero);
    });

    this.saving$.subscribe((saving) => {
      if (saving) {
        window.addEventListener('beforeunload', this.savingHandler);
      } else {
        window.removeEventListener('beforeunload', this.savingHandler);
      }
    });
  }

  savingHandler(e: BeforeUnloadEvent) {
    e.preventDefault();
  }

  setToken(token: string) {
    this.tokenSubject.next(token);
    sessionStorage.setItem(GitdbService.TOKEN, token);
    this.createRepo().then(() => {
      this.route.navigate(['']);
    }).catch();
  }

  update(hero: Hero) {
    this.saveSubject.next(true);
    this.updateSubject.next(hero);
  }

  private saveHero(hero: Hero) {
    from(this.createRepo()).pipe(
      mergeMap(() => {
        return from(this.repo.writeFile(
          'main',
          `heroes/${hero.name}.json?time=${Date.now()}`,
          JSON.stringify(hero.json, null, 2),
          `Updated ${hero.name}.json on ${new Date().toUTCString()}`
        ));
      }),
      tap((data: any) => {
        this.latestCommit = data.data.commit.sha;
        localStorage.setItem(LATEST_COMMIT, this.latestCommit!);
        this.heroCacheSubject.next(null);
      }),
    ).subscribe(() => {
      this.saveSubject.next(false);
    });
  }

  getHero(name: string): Observable<Hero> {
    return from(this.createRepo()).pipe(
      mergeMap(() => {
        return from(this.repo.getContents('main', `heroes/${name}.json?time=${Date.now()}`))
          .pipe(map((data: any) => {
            const string = atob(data.data.content);
            const hero: HeroJSON = JSON.parse(string);
            return new Hero(hero);
          }));
      }));
  }

  getAllHeroes(): Observable<Hero[]> {
    return from(this.createRepo()).pipe(
      map(() => this.heroCache$),
      mergeMap((heroes) => {
        return heroes.pipe(
          mergeMap((h) => {
            return h === null ? this.retrieveHeroes() : of(h);
          })
        );
      })
    );
  }

  // Images

  private imageCache = new Map<string, string>();

  private imageUpdateSubject = new Subject<[string, string]>();
  imageUpdate$: Observable<[string, string]> = this.imageUpdateSubject.asObservable();

  getImageString(name: string): Observable<string> {
    return from(this.createRepo()).pipe(
      mergeMap(() => {
        if (this.imageCache.has(name)) return of(this.imageCache.get(name)!);
        return from(this.repo.getContents('main', `images/${name}.png?time=${Date.now()}`)).pipe(
          mergeMap((res: any) => this.checkBase64(res)),
          tap((image) => this.imageCache.set(name, image)),
        );
      }),
    );
  }

  uploadImage(file: File, heroName: string): Observable<string> {
    return from(this.createRepo()).pipe(
      mergeMap(() => from(toDataUrl(file))),
      mergeMap((fileContents: string) => {
        this.imageCache.set(heroName, fileContents);
        this.imageUpdateSubject.next([heroName, fileContents]);
        return from(this.repo.writeFile(
          'main',
          `images/${heroName}.png?time=${Date.now()}`,
          fileContents,
          `Uploaded ${heroName}.png to the database`
        ));
      }),
      mergeMap(() => 'a')
    );
  }

  private checkBase64(image: any): Observable<string> {
    image = image.data.content as string;
    return atob(image).startsWith('data:image/png;base64,') ?
      of(atob(image)) :
      of(`data:image/png;base64,${image}`);
  }

  // Other

  setName(user: string) {
    this.usernameSubject.next(user);
    sessionStorage.setItem(GitdbService.USERNAME, user);
  }

  private retrieveHeroes(): Observable<Hero[]> {
    return from(this.repo.getContents('main', 'heroes/'))
      .pipe(
        map( (data: any) => {
          return data.data.map((c: any) => {
            const name = c.name as string;
            const a = this.getHero(name.replace('.json', ''));
            return a;
          });
        }),
        mergeMap((heroes) => forkJoin<Hero[]>(heroes)),
        tap((heroes) => this.heroCacheSubject.next(heroes))
      );
  }

  async createRepo() {
    if (this.repo === undefined || this.repo === null) {
      const user = await firstValueFrom(this.username$);
      this.repo = await this.gh.getRepo(user, '5e-db');
      await this.repo.getContents('main', `README.md?time=${Date.now()}`)
        .catch(() => {
          this.heroCacheSubject.next(null);
          this.tokenSubject.next('');
          this.usernameSubject.next('');
          this.repo = undefined;
          this.route.navigate(['token']);
          throw new Error('Fail');
        });
    }
  }
}

export function toDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
  });
}
