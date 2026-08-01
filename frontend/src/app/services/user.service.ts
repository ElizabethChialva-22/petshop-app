import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://127.0.0.1:8000/api';

export interface User {
  id?: number;
  name: string;
  email: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  private authHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token') ?? '';
    return { headers: new HttpHeaders({ Authorization: `Token ${token}` }) };
  }

  register(name: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(`${API_URL}/usuarios/`, { name, email, password, role: 'cliente' });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_URL}/login/`, { email, password });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/usuarios/`, this.authHeaders());
  }

  obtenerUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/usuarios/`, this.authHeaders());
  }

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/usuarios/`, usuario);
  }
}
