import { Directive, HostBinding, Input } from "@angular/core";
import { Hero } from "src/app/domain/hero";

@Directive()
export abstract class AbstractBlock {
  @HostBinding('class') clazz = 'block'

  @Input() hero!: Hero;
}

export enum Blocks {
  STAT = 0,
  COMBAT = 1,
  FEATURES = 2,
  INVENTORY = 3
}