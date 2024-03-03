import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GitdbService } from 'src/app/services/gitdb.service';

@Component({
  selector: 'app-token-page',
  templateUrl: './token-page.component.html',
  styleUrls: ['./token-page.component.less']
})
export class TokenPageComponent implements OnInit {

  form: FormGroup;
  control: FormControl<string | null>;

  token: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly gitService: GitdbService
  ) {
    this.control = fb.control<string>('');
    this.form = fb.group({
      control: this.control
    });
  }

  ngOnInit(): void {
      this.control.valueChanges.subscribe((newValue) => {
        this.token = newValue!;
      });
  }

  canSubmit() {
    return this.token !== '';
  }

  onSubmit() {
    this.gitService.setToken(this.token);
  }
}
