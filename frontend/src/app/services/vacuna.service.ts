import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface Vacuna {
  id: number;
  nombre: string;
  descripcion: string;
  frecuencia: string;
}

@Injectable({
 providedIn: 'root'
})

export class VacunaService {

 private api = 'http://127.0.0.1:8000/api/vacunas/';


 constructor(
   private http: HttpClient
 ){}
 private headers(): HttpHeaders {
   const token = localStorage.getItem('token') ?? '';
   return new HttpHeaders({ Authorization: `Token ${token}` });
 }
 obtenerVacunas(): Observable<Vacuna[]> {
   return this.http.get<Vacuna[]>(this.api, { headers: this.headers() });
 }
 crearVacuna(vacuna: Vacuna): Observable<Vacuna> {
   return this.http.post<Vacuna>(this.api, vacuna, { headers: this.headers() });
 }

}
