import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { ListaComponent } from './components/lista/lista.component';


export const AppRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'lista', component: ListaComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'product' , component: ProductComponent}
  ];
