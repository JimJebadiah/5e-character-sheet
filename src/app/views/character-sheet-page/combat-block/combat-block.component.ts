import { Component, OnDestroy } from '@angular/core';
import { AbstractBlock } from '../abstract-block';
import { swipeAnimation } from '../swipe-animation';

@Component({
  selector: 'app-combat-block',
  templateUrl: './combat-block.component.html',
  styleUrls: ['./combat-block.component.less'],
  animations: [swipeAnimation]
})
export class CombatBlockComponent extends AbstractBlock implements OnDestroy {
  ngOnDestroy(): void { }
}
