import { Component, OnInit, ChangeDetectorRef, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MascotasService } from '../../services/mascota.service';
import { UserService, User } from '../../services/user.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit {
  role = '';
  usuarioId: number | null = null;
  totalUsuarios = 0;
  totalMascotas = 0;
  totalProductos = 0;
  productos: any[] = [];
  usuarios: User[] = [];
  misMascotas: any[] = [];
  nombreUsuario = ''

  constructor(
    private router: Router,
    private mascotasService: MascotasService,
    private userService: UserService,
    private productosService: ProductosService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') ?? 'cliente';
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.usuarioId = usuario.id_usuario ?? null;
    this.nombreUsuario = usuario.name ?? 'usuario';

    if (this.role === 'admin') {
      this.ngZone.run(() => {
        this.userService.getUsers().subscribe({
          next: (data) => { this.totalUsuarios = data.length; this.usuarios = data; this.cdr.markForCheck(); },
          error: () => {}
        });
        this.mascotasService.obtenerMascotas().subscribe({
          next: (data) => { this.totalMascotas = data.length; this.cdr.markForCheck(); },
          error: () => {}
        });
        this.productosService.obtenerProductos().subscribe({
          next: (data) => { this.totalProductos = data.length; this.productos = data; this.cdr.markForCheck(); },
          error: () => {}
        });
      });
    }

    if (this.role === 'cliente') {
      this.ngZone.run(() => {
        this.mascotasService.obtenerMascotas().subscribe({
          next: (data) => {
            this.misMascotas = data.filter((m: any) => m.id_dueno === this.usuarioId);
            this.cdr.markForCheck();
          },
          error: () => {}
        });
      });
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/iniciar-sesion']);
  }
}