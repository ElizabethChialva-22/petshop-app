import { Routes } from '@angular/router';
import { Home } from './page/home/home';
import { Contact } from './contact/contact';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'contact', component: Contact },
  { path: 'quienes-somos', component: QuienesSomosComponent }
];