import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'img[default]',
  host: {
    '(error)':'updateUrl()',
    '(load)': 'load()',
    '[src]':'src'
  }
})
export class ImagePreloadDirective {
  @Input() src?: string | null;
  @Input() default?: string | null;
  @HostBinding('class') className: string = '';

  updateUrl() {
    this.src = this.default;
  }

  load() {
    this.className = 'image-loaded'
  }
}
