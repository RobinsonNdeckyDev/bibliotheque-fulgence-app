import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { ListeLivreComponent } from './liste-livre/liste-livre.component';
import { ListeAuteurComponent } from './liste-auteur/liste-auteur.component';

const routes: Routes = [
    { path: '', component: DashAdminComponent},
    { path: 'dash-admin', component: DashAdminComponent },
    { path: 'livres', component: ListeLivreComponent },
    { path: 'auteurs', component: ListeAuteurComponent },
    { path: '', redirectTo: 'dash-admin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
