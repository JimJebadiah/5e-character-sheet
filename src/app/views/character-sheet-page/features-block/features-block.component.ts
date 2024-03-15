import { Component, OnInit, Type } from '@angular/core';
import { AbstractBlock } from '../abstract-block';
import { Feat } from 'src/app/domain/feat';
import { ListType } from 'src/app/components/list-block/list-data/list-type';
import { GitdbService } from 'src/app/services/gitdb.service';
import { Ability } from 'src/app/domain/ability';

@Component({
  selector: 'app-features-block',
  templateUrl: './features-block.component.html',
  styleUrls: ['./features-block.component.less']
})
export class FeaturesBlockComponent extends AbstractBlock implements OnInit {
  featsType = Feat;
  featsItems: Feat[] = [];

  abilitiesType = Ability;
  abilitiesItems: Ability[] = [];

  constructor(
    private readonly dbService: GitdbService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.featsItems = this.hero.feats;
    this.abilitiesItems = this.hero.abilities;
  }

  updateFeatsList(event: ListType[]) {
    if (event.filter((i) => i instanceof Feat).length === event.length) {
      this.hero.feats = event as Feat[];
      this.featsItems = this.hero.feats;
      this.dbService.update(this.hero);
    }
  }

  updateAbilitiesList(event: ListType[]) {
    if (event.filter((i) => i instanceof Ability).length === event.length) {
      const abilities = event as Ability[];
      abilities.forEach((a) => a.setMaxCharge(this.hero));
      this.hero.abilities = abilities;
      this.abilitiesItems = this.hero.abilities;
      this.dbService.update(this.hero);
    }
  }
}
