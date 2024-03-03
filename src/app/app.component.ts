import { Component } from '@angular/core';
import { GitdbService } from './services/gitdb.service';
import { Hero } from './domain/hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'psc';
}
