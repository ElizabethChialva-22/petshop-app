import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent implements OnInit {
  estaLogueado = false;
  rol = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.actualizarEstado();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.actualizarEstado();
    });
  }

  actualizarEstado(): void {
    this.estaLogueado = !!localStorage.getItem('token');
    this.rol = localStorage.getItem('role') ?? '';
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('usuario');
    this.estaLogueado = false;
    this.router.navigate(['/iniciar-sesion']);
  }
}