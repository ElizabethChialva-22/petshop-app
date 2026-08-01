import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { QuienesSomosComponent } from './pages/quienes-somos/quienes-somos';
import { RegistroComponent } from './pages/registro/registro';
import { IniciarSesion } from './pages/iniciar-sesion/iniciar-sesion';
import { MascotasComponent } from './pages/mascotas/mascotas';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth.guard';
import { ProductosComponent } from './pages/productos/productos';
import { AdminProductosComponent } from './pages/admin-productos/admin-productos';
import { AdminUsuariosComponent } from './pages/admin-usuarios/admin-usuarios';
import { CarnetComponent } from './pages/carnet/carnet';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'contact', component: Contact },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'iniciar-sesion', component: IniciarSesion },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'mascotas', component: MascotasComponent, canActivate: [authGuard] },
  { path: 'mascotas/:id/carnet', component: CarnetComponent, canActivate: [authGuard] },
  { path: 'productos', component: ProductosComponent },
  { path: 'admin-productos', component: AdminProductosComponent, canActivate: [authGuard] },
  { path: 'admin-usuarios', component: AdminUsuariosComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];