import { Directive, HostBinding, Input } from "@angular/core";
import { Hero } from "src/app/domain/hero";
import { Weapon } from "src/app/domain/weapon";

@Directive()
export abstract class AbstractWeaponComponent {
  @HostBinding('class') clazz = 'weapon-item'

  @Input() hero!: Hero;
  @Input() weapon!: Weapon;
}
