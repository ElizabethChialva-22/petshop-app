import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id_producto?:     number;
  nombre:           string;
  descripcion:      string;
  precio:           number;
  stock:            number;
  id_categoria:     number;
  categoria_nombre?: string;
}

export interface Categoria {
  id_categoria: number;
  nombre:       string;
}

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private api = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') ?? '';
    return new HttpHeaders({ Authorization: `Token ${token}` });
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.api}/productos/`);
  }

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.api}/categorias/`,
      { headers: this.getHeaders() });
  }

  crearProducto(data: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.api}/productos/`, data,
      { headers: this.getHeaders() });
  }

  actualizarProducto(id: number, data: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.api}/productos/${id}/`, data,
      { headers: this.getHeaders() });
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/productos/${id}/`,
      { headers: this.getHeaders() });
  }
}