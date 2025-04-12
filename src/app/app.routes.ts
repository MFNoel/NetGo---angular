import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TariffsComponent } from './pages/tariffs/tariffs.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'tariffs', component: TariffsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
];