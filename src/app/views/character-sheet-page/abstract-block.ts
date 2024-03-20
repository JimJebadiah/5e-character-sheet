import { Directive, HostBinding, Input } from '@angular/core';
import { isMobile } from 'src/app/app.component';
import { Hero } from 'src/app/domain/hero';

@Directive()
export abstract class AbstractBlock {
  @HostBinding('class') clazz = 'block';
  @HostBinding('@swipeAnimation') swipeAnimation = '';

  @Input() hero!: Hero;
  isMobile = isMobile();
}

export enum Blocks {
  STAT = 0,
  COMBAT = 1,
  FEATURES = 2,
  INVENTORY = 3
}
