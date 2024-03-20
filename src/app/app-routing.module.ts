import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page.component';
import { noTokenGuard } from './views/token-page/token-guard';
import { TokenPageComponent } from './views/token-page/token-page.component';
import { CharacterSheetPageComponent } from './views/character-sheet-page/character-sheet-page.component';
import { saveGuard } from './views/character-sheet-page/save-guard';

const routes: Routes = [
  {path: '', component: HomePageComponent, canActivate: [noTokenGuard]},
  {path: 'token', component: TokenPageComponent},
  {path: 'character/:name', component: CharacterSheetPageComponent, canDeactivate: [saveGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
