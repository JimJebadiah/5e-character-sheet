import { Component } from '@angular/core';
import versionJson from './version.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  version = versionJson['version'];
}
