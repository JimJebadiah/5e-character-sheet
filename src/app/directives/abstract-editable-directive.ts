import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from "@angular/core";
import { Setter, Getter } from "./editable-number/editable-number.directive";
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from "@angular/cdk/portal";

@Directive()
export abstract class AbstractEditableDirective<T> implements AfterViewInit {
  @HostListener('click')
  onClick() {
    this.open();
  }

  @HostListener('mouseenter')
  onEnter() {
    this.ref.nativeElement.style.cursor = 'pointer';
    this.overlay!.setAttribute('style',
      `position: absolute; width: ${this.ref.nativeElement.clientWidth}px; height: ${this.ref.nativeElement.clientHeight}px; background-color: rgba(0, 0, 0, 0.1); border-radius: 5%`
    );
  }

  @HostListener('mouseleave')
  onLeave() {
    this.ref.nativeElement.style.cursor = 'auto';
    this.overlay!.setAttribute('style',
    `position: absolute; width: ${this.ref.nativeElement.clientWidth}px; height: ${this.ref.nativeElement.clientHeight}px; background-color: transparent`
    );
  }

  @Input() setter!: Setter<T>;
  @Input() getter!: Getter<T>;

  overlay: HTMLDivElement | null = null;

  constructor(
    private readonly ref: ElementRef,
    private readonly renderer: Renderer2,
    private readonly matDialog: MatDialog
  ) { }

  protected abstract dialog(): ComponentType<any>;

  ngAfterViewInit(): void {
    console.log(this.ref.nativeElement);
    this.overlay = document.createElement('div');
    this.overlay.className = 'box-overlay';
    this.overlay.setAttribute('style',
      `position: absolute; width: ${this.ref.nativeElement.clientWidth}px; height: ${this.ref.nativeElement.clientHeight}px; background-color: transparent`
    );

    this.renderer.appendChild(this.ref.nativeElement, this.overlay);
  }

  open() {
    this.matDialog.open(this.dialog(), {
      data: {
        getter: this.getter,
        setter: this.setter
      },
      autoFocus: false,
    });
  }
}
