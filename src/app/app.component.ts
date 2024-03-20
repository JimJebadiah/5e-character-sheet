import { Component } from '@angular/core';
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
      const i = domSanitizer.bypassSecurityTrustResourceUrl((urlJson as never)[icon]);
      registry.addSvgIcon(icon, i);
    });
  }
}

export function isMobile(): boolean {
  const agent = window.navigator.userAgent;
  return /iPhone|iPad|Android/.test(agent);
}
