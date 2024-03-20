import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.less'
})
export class NotFoundComponent {
  constructor(private readonly router: Router) {}

  goHome() {
    this.router.navigate(['']);
  }
}
