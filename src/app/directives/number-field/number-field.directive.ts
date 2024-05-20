/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appNumberField]',
})
export class NumberFieldDirective implements OnInit {
  private readonly PATTERN = /^[0-9]{0,3}$/;

  @Input() name!: string;
  @Input() value!: number;
  @Input() formGroup!: FormGroup;

  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  control = new FormControl('0');
  ref: any;

  constructor(
    private readonly host: ElementRef
  ) { }

  ngOnInit(): void {
    this.ref = this.host.nativeElement.querySelector('input');
    this.formGroup.addControl(this.name, this.control);
    this.value = this.value ?? 0;

    this.control.valueChanges.subscribe((val) => {
      if (this.ref !== undefined) {
        console.log(val);
        if (val! === '') {
          this.value = 1;
          this.ref.value = '';
          return;
        }

        if (val! === '0') {
          this.value = 1;
          this.ref.value = '1';
        }

        if (this.PATTERN.test(val!)) {
          this.ref.value = val!;
          this.value = Number.parseInt(this.ref.value);
        } else {
          this.ref.value = val!.substring(val!.length - 1);
        }

        this.control.setValue(this.value.toString(), {emitEvent: false});
        this.valueChange.next(this.value.toString());
      }
    });

    this.control.setValue(`${this.value}`);
  }

}
