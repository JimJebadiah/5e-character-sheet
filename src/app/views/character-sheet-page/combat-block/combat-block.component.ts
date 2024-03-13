import { Component } from '@angular/core';
import { AbstractBlock } from '../abstract-block';

@Component({
  selector: 'app-combat-block',
  templateUrl: './combat-block.component.html',
  styleUrls: ['./combat-block.component.less']
})
export class CombatBlockComponent extends AbstractBlock { }
