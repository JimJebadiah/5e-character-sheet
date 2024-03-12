import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Hero, HeroJSON } from '../domain/hero';
import { BehaviorSubject, Observable, ReplaySubject, Subject, combineLatest, debounceTime, firstValueFrom, forkJoin, from, map, merge, mergeAll, mergeMap, of, tap, toArray, zip, zipWith } from 'rxjs';
import { Token } from '@angular/compiler';

declare var GitHub: any;

@Injectable({
  providedIn: 'root'
})
export class GitdbService {
  private static readonly TOKEN: string = 'auth-token';
  private static readonly USERNAME: string = 'username';

  private gh: any;
  private repo: any;

  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject('');
  token$: Observable<string> = this.tokenSubject.asObservable();

  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject('');
  username$: Observable<string> = this.usernameSubject.asObservable();

  private updateSubject: Subject<Hero> = new Subject();
  update$ = this.updateSubject.asObservable();

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

    // this.update$.pipe(debounceTime(2500)).subscribe((hero) => {
    //   this.saveHero(hero);
    // });
  }

  setToken(token: string) {
    this.tokenSubject.next(token);
    sessionStorage.setItem(GitdbService.TOKEN, token);
    this.route.navigate(['']);
  }

  update(hero: Hero) {
    this.updateSubject.next(hero);
  }

  saveHero(hero: Hero) {
    from(this.createRepo()).pipe(
      mergeMap(() => {
        return this.repo.writeFile(
          'main',
          `heroes/${hero.name}.json`,
          JSON.stringify(hero.json),
          `Updated ${hero.name}.json on ${new Date().toUTCString()}`
        );
      }),
      tap(() => {
        this.heroCacheSubject.next(null);
      }),
    ).subscribe();
  }

  getHero(name: string): Observable<Hero> {
    return from(this.createRepo()).pipe(mergeMap(() => {
      return from(this.repo.getContents('main', `heroes/${name}.json`))
      .pipe(map((data: any) => {
        const string = atob(data.data.content);
        const hero: HeroJSON = JSON.parse(string);
        return new Hero(hero);
      }));
    }))
  }

  getAllHeroes(): Observable<Hero[]> {
    return from(this.createRepo()).pipe(
      map(() => this.heroCache$),
      mergeMap((heroes) => {
        return heroes.pipe(
          mergeMap((h) => {
            return h === null ? this.retrieveHeros() : of(h);
          })
        )
      })
    );
  }

  getImageString(name: string): Observable<string> {
    return this.username$.pipe(
      map((u) => `https://raw.githubusercontent.com/${u}/5e-db/main/images/${name}.png`),
    )
  }

  setName(user: string) {
    this.usernameSubject.next(user);
    sessionStorage.setItem(GitdbService.USERNAME, user);
  }

  private retrieveHeros(): Observable<Hero[]> {
    return from(this.repo.getContents('main', `heroes/`))
      .pipe(
        map( (data: any) => {
          return data.data.map((c: any) => {
            const name = c.name as string
            const a = this.getHero(name.replace('.json', ''));
            return a
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
    }
  }
}
