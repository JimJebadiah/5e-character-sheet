import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'img[dataSrc]',
  host: {
    '(error)':'updateUrl()',
    '(load)': 'load()',
    '[src]':'dataSrc'
  }
})
export class ImagePreloadDirective {
  @Input() dataSrc?: string | null;
  @HostBinding('class') className: string = '';

  // updateUrl() {
  //   from
  // }

  load() {
    this.className = 'image-loaded';
  }
}
