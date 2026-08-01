import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MascotasService {

  private apiUrl = 'http://127.0.0.1:8000/api/mascotas/';

  constructor(private http: HttpClient) {}

  private headers(): HttpHeaders {
    const token = localStorage.getItem('token') ?? '';
    return new HttpHeaders({ Authorization: `Token ${token}` });
  }

  obtenerMascotas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers() });
  }

  crearMascota(mascota: any): Observable<any> {
    return this.http.post(this.apiUrl, mascota, { headers: this.headers() });
  }

  actualizarMascota(id: number, mascota: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, mascota, { headers: this.headers() });
  }

  eliminarMascota(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`, { headers: this.headers() });
  }
}