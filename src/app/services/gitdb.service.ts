import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Hero, HeroJSON } from '../domain/hero';
import { BehaviorSubject, Observable, ReplaySubject, combineLatest, firstValueFrom, forkJoin, from, map, mergeAll, mergeMap, of, tap, toArray } from 'rxjs';
import { Token } from '@angular/compiler';

declare var GitHub: any;

@Injectable({
  providedIn: 'root'
})
export class GitdbService {
  private static readonly TOKEN: string = 'auth-token';

  private gh: any;
  private repo: any;

  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject('');
  token$: Observable<string> = this.tokenSubject.asObservable();

  private heroCacheSubject: ReplaySubject<Hero[] | null> = new ReplaySubject(1);
  private heroCache$ = this.heroCacheSubject.asObservable();

  token = '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'

  constructor(private readonly route: Router) {
    this.token$.subscribe((token) => {
      this.gh = new GitHub({
        token: this.token
      });
    });

    const token = sessionStorage.getItem(GitdbService.TOKEN);
    if (token !== undefined && token !== null) {
      this.tokenSubject.next(token);
    }

    this.heroCacheSubject.next(null);
  }

  setToken(token: string) {
    this.tokenSubject.next(token);
    sessionStorage.setItem(GitdbService.TOKEN, token);
    this.route.navigate(['']);
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
      tap((res) => {
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
      map(() => {
        return this.heroCache$;
      }),
      mergeMap((heroes) => {
        return heroes.pipe(
          mergeMap((h) => {
            return h === null ? this.retrieveHeros() : of(h);
          })
        )
      })
    );
  }

  private retrieveHeros(): Observable<Hero[]> {
    return from(this.repo.getContents('main', `heroes/`))
      .pipe(
        map((data: any) => {
          return data.data.map((c: any) => {
            const name = c.name as string
            return this.getHero(name.replace('.json', ''));
          });
        }),
        mergeMap((heroes) => forkJoin<Hero[]>(heroes)),
        tap((heroes) => this.heroCacheSubject.next(heroes))
      );
  }

  async createRepo() {
    if (this.repo === undefined || this.repo === null) {
      this.repo = await this.gh.getRepo('JimJebadiah', '5e-db');
    }
  }
}
