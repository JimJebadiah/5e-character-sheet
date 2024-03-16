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
    Object.keys(urlJson).forEach((icon: string) => {
      const i = domSanitizer.bypassSecurityTrustResourceUrl((urlJson as any)[icon]);
      registry.addSvgIcon(icon, i);
    });
  }
}

export function isMobile(): boolean {
  return window.outerWidth <= 480;
}
