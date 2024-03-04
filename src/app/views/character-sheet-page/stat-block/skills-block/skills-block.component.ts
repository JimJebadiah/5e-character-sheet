import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/domain/hero';
import { Skills, skills } from 'src/app/domain/skill';

@Component({
  selector: 'app-skills-block',
  templateUrl: './skills-block.component.html',
  styleUrls: ['./skills-block.component.less']
})
export class SkillsBlockComponent {
  @Input() hero!: Hero;
  skills = skills;

  getSkill(skill: Skills) {
    return this.hero.skills.get(skill)!;
  }

  getSkillValue(skill: Skills): string {
    const mod = this.getSkill(skill).getModifier(this.hero);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  }

  isProficient(skill: Skills): boolean {
    return this.getSkill(skill).proficient;
  }

  valueStyle(skill: Skills) {
    const mod = this.getSkill(skill).getModifier(this.hero);
    if (mod > 0) return 'positive';
    else if (mod == 0) return 'zero';
    else return 'negative';
  }
}
