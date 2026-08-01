import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario';

function contrasenaCoincide(control: AbstractControl): ValidationErrors | null {
  const contrasena = control.get('contrasena')?.value;
  const confirmar = control.get('confirmarContrasena')?.value;
  return contrasena === confirmar ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {

  form!: FormGroup;
  errorServer: string | null = null;
  exitoMsg: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*')]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*')]],
      direccion: ['', [Validators.required]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      confirmarContrasena: ['', [Validators.required]]
    }, { validators: contrasenaCoincide });
  }

  get Nombre() { return this.form.get('nombre'); }
  get Email() { return this.form.get('email'); }
  get Telefono() { return this.form.get('telefono'); }
  get Direccion() { return this.form.get('direccion'); }
  get Contrasena() { return this.form.get('contrasena'); }
  get ConfirmarContrasena() { return this.form.get('confirmarContrasena'); }

  onEnviar(event: Event) {
    event.preventDefault();
    this.errorServer = null;
    this.exitoMsg = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const nuevoUsuario: Usuario = {
      name: this.form.value.nombre,
      email: this.form.value.email,
      telefono: this.form.value.telefono,
      direccion: this.form.value.direccion,
      password: this.form.value.contrasena
    };

    this.userService.registrarUsuario(nuevoUsuario).subscribe({
      next: (res: any) => {
        this.exitoMsg = '¡Registro exitoso! Redirigiendo a iniciar sesión...';
        this.form.reset();
        setTimeout(() => this.irALogin(), 2500);
      },
      error: (err: any) => {
        this.errorServer = err.message || 'Error al conectar con el servidor.';
      }
    });
  }

  irALogin(): void {
    this.router.navigate(['/iniciar-sesion']);
  }
}