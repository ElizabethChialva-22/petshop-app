import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductosService, Categoria } from '../../services/productos.service';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-productos.html',
  styleUrl: './admin-productos.css'
})
export class AdminProductosComponent implements OnInit {

  form!: FormGroup;
  productos: any[]        = [];
  categorias: Categoria[] = [];
  editandoId: number | null = null;
  cargando = false;
  mensaje  = '';

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService
  ) {
    this.form = this.fb.group({
      nombre:       ['', Validators.required],
      descripcion:  ['', Validators.required],
      precio:       ['', [Validators.required, Validators.min(0)]],
      stock:        ['', [Validators.required, Validators.min(0)]],
      id_categoria: ['', Validators.required],
      imagen:       ['']
    });
  }

  ngOnInit(): void {
    this.cargarProductos();
    this.productosService.obtenerCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: () => this.mensaje = 'Error al cargar categorías.'
    });
  }

  cargarProductos(): void {
    this.productosService.obtenerProductos().subscribe({
      next: (data) => this.productos = data,
      error: () => this.mensaje = 'Error al cargar productos.'
    });
  }

  onEnviar(event: Event): void {
    event.preventDefault();
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.cargando = true;
    const op = this.editandoId
      ? this.productosService.actualizarProducto(this.editandoId, this.form.value)
      : this.productosService.crearProducto(this.form.value);
    op.subscribe({
      next: () => { this.mensaje = this.editandoId ? 'Actualizado.' : 'Registrado.'; this.resetForm(); this.cargarProductos(); },
      error: () => this.mensaje = 'Error al guardar.',
      complete: () => this.cargando = false
    });
  }

  editarProducto(p: any): void {
    this.editandoId = p.id_producto;
    this.form.patchValue(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminarProducto(id: number): void {
    if (!confirm('¿Eliminar?')) return;
    this.productosService.eliminarProducto(id).subscribe({
      next: () => this.cargarProductos(),
      error: () => this.mensaje = 'Error al eliminar.'
    });
  }

  cancelarEdicion(): void { this.resetForm(); }

  resetForm(): void { this.form.reset(); this.editandoId = null; this.mensaje = ''; }

  get Nombre()      { return this.form.get('nombre'); }
  get Descripcion() { return this.form.get('descripcion'); }
  get Precio()      { return this.form.get('precio'); }
  get Stock()       { return this.form.get('stock'); }
  get Categoria()   { return this.form.get('id_categoria'); }
}