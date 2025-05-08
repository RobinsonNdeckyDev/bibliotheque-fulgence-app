import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuteurDashComponent } from './auteur-dash/auteur-dash.component';
const routes: Routes = [
    { path: '', component: AuteurDashComponent},
    { path: 'dash-auteur', component: AuteurDashComponent },
    { path: '', redirectTo: 'dash-auteur', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
