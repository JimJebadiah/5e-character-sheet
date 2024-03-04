import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/domain/hero';
import { GitdbService } from 'src/app/services/gitdb.service';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.less']
})
export class InfoBlockComponent {
  @Input() hero!: Hero;

  constructor(private readonly dbService: GitdbService) {}

  
}
