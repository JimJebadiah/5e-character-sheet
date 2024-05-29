import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {GitdbService, toDataUrl} from "../../services/gitdb.service";
import {BehaviorSubject, catchError, from, map, mergeMap, Observable, of, ReplaySubject, tap} from "rxjs";
import {Base64, toBase64} from "js-base64";
import {isMobile} from "../../app.component";

@Component({
  selector: 'app-character-image',
  templateUrl: './character-image.component.html',
  styleUrl: './character-image.component.less'
})
export class CharacterImageComponent implements OnInit, AfterViewInit {
  @Input() heroName!: string;
  @Input() width!: number;

  @ViewChild('imageContainer') imageContainer: ElementRef | null = null;

  image: string = '';

  private loadedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loaded$: Observable<boolean> = this.loadedSubject.asObservable();

  constructor(private readonly dbService: GitdbService) {}

  ngOnInit(): void {
    this.dbService.getImageString(this.heroName).subscribe( (res) => {
      this.image = res;
      this.loadedSubject.next(true);
    });

    this.dbService.imageUpdate$.subscribe(([heroName, image]) => {
      if (this.heroName === heroName) this.image = image;
    });
  }

  ngAfterViewInit() {
    this.imageContainer!.nativeElement.style.height = `${this.width}px`;
    this.imageContainer!.nativeElement.style.width = `${this.width}px`;

    if (isMobile()) {
      this.imageContainer!.nativeElement.style.height = `${this.width * (2/3)}px`;
      this.imageContainer!.nativeElement.style.width = `${this.width * (2/3)}px`;
    }
  }
}
