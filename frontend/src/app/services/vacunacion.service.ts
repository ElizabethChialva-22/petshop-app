import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacunacionService {

  private apiUrl = 'http://127.0.0.1:8000/vacunaciones/';

  constructor(private http: HttpClient) {}

  private headers(): HttpHeaders {
    const token = localStorage.getItem('token') ?? '';

    return new HttpHeaders({
      Authorization: `Token ${token}`
    });
  }

  obtenerVacunaciones(): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl,
      { headers: this.headers() }
    );
  }
}
