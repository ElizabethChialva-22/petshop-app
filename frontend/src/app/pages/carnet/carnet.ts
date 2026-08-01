import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-carnet',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './carnet.html',
  styleUrl: './carnet.css'
})
export class CarnetComponent implements OnInit {
  mascotaId!: number;
  mascota: any = null;
  vacunaciones: any[] = [];
  turnos: any[] = [];
  vacunas: any[] = [];
  mensaje = '';
  mostrarFormVacuna = false;
  mostrarFormTurno = false;

  formVacuna!: FormGroup;
  formTurno!: FormGroup;

  private api = 'http://127.0.0.1:8000/api';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.formVacuna = this.fb.group({
      nombre_vacuna: ['', Validators.required],
      fecha_aplicacion: ['', Validators.required],
      veterinario: ['', Validators.required]
    });

    this.formTurno = this.fb.group({
      fecha: ['', Validators.required],
      motivo: ['', Validators.required],
      estado: ['pendiente', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    this.mascotaId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarDatos();
  }

  private headers(): HttpHeaders {
    const token = localStorage.getItem('token') ?? '';
    return new HttpHeaders({ Authorization: `Token ${token}` });
  }

  cargarDatos(): void {
    this.http.get<any>(`${this.api}/mascotas/${this.mascotaId}/`, { headers: this.headers() }).subscribe({
      next: (data) => this.ngZone.run(() => { this.mascota = data; this.cdr.markForCheck(); })
    });

    this.http.get<any[]>(`${this.api}/mascotas/${this.mascotaId}/vacunaciones/`, { headers: this.headers() }).subscribe({
      next: (data) => this.ngZone.run(() => { this.vacunaciones = data; this.cdr.markForCheck(); })
    });

    this.http.get<any[]>(`${this.api}/mascotas/${this.mascotaId}/turnos/`, { headers: this.headers() }).subscribe({
      next: (data) => this.ngZone.run(() => { this.turnos = data; this.cdr.markForCheck(); })
    });

    this.http.get<any[]>(`${this.api}/vacunas/`, { headers: this.headers() }).subscribe({
      next: (data) => this.ngZone.run(() => { this.vacunas = data; this.cdr.markForCheck(); })
    });
  }

  agregarVacuna(): void {
    if (this.formVacuna.invalid) { this.formVacuna.markAllAsTouched(); return; }
    const data = { ...this.formVacuna.value, id_mascota: this.mascotaId };
    this.http.post(`${this.api}/mascotas/${this.mascotaId}/vacunaciones/`, data, { headers: this.headers() }).subscribe({
      next: () => this.ngZone.run(() => {
        this.mensaje = 'Vacuna registrada.';
        this.formVacuna.reset();
        this.mostrarFormVacuna = false;
        this.cargarDatos();
      }),
      error: () => this.ngZone.run(() => { this.mensaje = 'Error al registrar vacuna.'; })
    });
  }

  agregarTurno(): void {
    if (this.formTurno.invalid) { this.formTurno.markAllAsTouched(); return; }
    const data = { ...this.formTurno.value, id_mascota: this.mascotaId };
    this.http.post(`${this.api}/mascotas/${this.mascotaId}/turnos/`, data, { headers: this.headers() }).subscribe({
      next: () => this.ngZone.run(() => {
        this.mensaje = 'Turno registrado.';
        this.formTurno.reset({ estado: 'pendiente' });
        this.mostrarFormTurno = false;
        this.cargarDatos();
      }),
      error: () => this.ngZone.run(() => { this.mensaje = 'Error al registrar turno.'; })
    });
  }
}