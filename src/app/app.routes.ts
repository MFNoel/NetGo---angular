import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TariffsComponent } from './pages/tariffs/tariffs.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ManagementComponent } from './pages/management/management.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'management',
        loadComponent: () => import('./pages/management/management.component').then(m => m.ManagementComponent),
        canActivate: [authGuard]
    },
    {
        path: 'tariffs',
        loadComponent: () => import('./pages/tariffs/tariffs.component').then(m => m.TariffsComponent)
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },
];