import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/domain/hero';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.less']
})
export class CharacterComponent {
  @Input() hero: Hero | null = null;
}
