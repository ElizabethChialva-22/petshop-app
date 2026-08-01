import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import type { LoginResponse } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css',
})
export class IniciarSesion {
  form!: FormGroup;
  mensajeError = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get Email() { return this.form.get('email'); }
  get Password() { return this.form.get('password'); }

  onEnviar(event: Event): void {
    event.preventDefault();
    this.mensajeError = '';

    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.userService.login(email, password).subscribe({
        next: (res: LoginResponse) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem(
            'usuario',
            JSON.stringify(res.user)
          );
          const role = res.user.role ?? 'cliente';
          localStorage.setItem('role', role);
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.mensajeError = 'Email o contraseña incorrectos.';
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
