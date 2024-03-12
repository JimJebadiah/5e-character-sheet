import { GitdbService } from 'src/app/services/gitdb.service'
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from 'src/app/domain/hero';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {

  heroes: Hero[] = [];
  loaded: boolean = false;

  constructor(
    private readonly dbService: GitdbService,
    private readonly route: Router
  ) { }

  ngOnInit(): void {
    this.dbService.getAllHeroes().subscribe((h) => {
      this.heroes = h;
      this.loaded = true;
    });
  }

  navigate() {
    this.route.navigate(['token']);
  }
}
