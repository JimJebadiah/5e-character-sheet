import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page.component';
import { noTokenGuard } from './views/token-page/token-guard';
import { TokenPageComponent } from './views/token-page/token-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent, canActivate: [noTokenGuard]},
  {path: 'token', component: TokenPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
