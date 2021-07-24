import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './error/error.component';
import { PlataformsComponent } from './components/plataforms/plataforms.component';

const routes: Routes = [

  { path: '', component: PlataformsComponent },
  { path: 'plataformas', component: PlataformsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
