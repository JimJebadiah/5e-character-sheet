import { Component } from '@angular/core';
import { GitdbService } from './services/gitdb.service';
import { Hero } from './domain/hero';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import urlJson from './url.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'psc';

  constructor(
    registry: MatIconRegistry,
    domSanitizer: DomSanitizer
  ) {
    const url = domSanitizer.bypassSecurityTrustResourceUrl(urlJson.url);
    registry.addSvgIcon('sword', url);
  }
}
