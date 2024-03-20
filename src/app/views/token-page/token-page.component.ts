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
  user: FormControl<string | null>;
  control: FormControl<string | null>;

  token: string = '';
  username: string = '';
  error: boolean = false;

  constructor(
    fb: FormBuilder,
    private readonly gitService: GitdbService
  ) {
    this.control = fb.control<string>('');
    this.user = fb.control<string>('');
    this.form = fb.group({
      control: this.control,
      user: this.user
    });
  }

  ngOnInit(): void {
      this.control.valueChanges.subscribe((newValue) => {
        this.token = newValue!;
      });

      this.user.valueChanges.subscribe((user) => {
        this.username = user!;
      });
  }

  canSubmit() {
    return this.token !== '' && this.username !== '';
  }

  onSubmit() {
    this.gitService.setName(this.username);
    this.gitService.setToken(this.token);
    this.gitService.createRepo().catch((u) => {
      this.error = true;
    });
  }
}
