import {Component, Input, OnInit} from '@angular/core';
import {GitdbService} from "../../services/gitdb.service";
import {from, map, mergeMap, tap} from "rxjs";
import {Base64} from "js-base64";

@Component({
  selector: 'app-character-image',
  templateUrl: './character-image.component.html',
  styleUrl: './character-image.component.less'
})
export class CharacterImageComponent implements OnInit {
  @Input() heroName!: string;

  image: string = '';

  constructor(private readonly dbService: GitdbService) {}

  ngOnInit(): void {
    this.dbService.getImageString(this.heroName).pipe(
      mergeMap((img) => from(fetch(img).then((res) => res.text()))),
      mergeMap((res) => from(this.checkBase64(res))),
    ).subscribe((res) => {
      this.image = res;
    });
  }

  private checkBase64(image: string): string {
    try {
      window.atob(image.split(',')[1]);
      return image;
    } catch (e) {
      console.log(`data:image/png;base64,${Base64.toBase64(image)}`);
      return `data:image/png;base64,${Base64.toBase64(image)}`;
    }
  }

}
