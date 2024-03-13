import { Directive, Input } from "@angular/core";
import { Hero } from "src/app/domain/hero";

@Directive()
export abstract class AbstractBlock {
  @Input() hero!: Hero;
}