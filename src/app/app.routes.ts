import { Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { DashLayoutComponent } from './layouts/dash-layout/dash-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { Page404Component } from './notFound/page-404/page-404.component';

export const routes: Routes = [

    // route par défaut
    { path: '', component: LoginComponent },

    // routes pour auth
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // route pour module admin
    {
        path: 'dash-admin',
        component: DashLayoutComponent,
        loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule),
        canActivate: [authGuard]
    },

    // route pour module auteur
    {
        path: 'dash-auteur',
        component: DashLayoutComponent,
        loadChildren: () => import('./views/client/client.module').then(m => m.ClientModule),
        canActivate: [authGuard]
    },



    // page notFound
    { path: '**', component: Page404Component},

    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
