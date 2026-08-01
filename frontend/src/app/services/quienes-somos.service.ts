import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuienesSomosService {

  profesionalList: any;

  obtenerProfesionales() {
    this.profesionalList = [
      {
        nombre: 'Lautaro Nahuel Ancillotti',
        rol: 'Atención al cliente',
        descripcion: 'Se encarga de que cada consulta tenga respuesta.',
        foto: 'equipo/Lautaro.jpg'
      },
      {
        nombre: 'Laura Molina',
        rol: 'Diseño y comunicación',
        descripcion: 'Se ocupa de la imagen y la comunicación del equipo.',
        foto: 'equipo/Laura.jpg'
      },
      {
        nombre: 'Claudio Nicolas Audicio',
        rol: 'Logística y stock',
        descripcion: 'Controla que los productos estén siempre disponibles.',
        foto: 'equipo/Claudio.jpg'
      },
      {
        nombre: 'Elizabeth Normal J. Chialva',
        rol: 'Administración',
        descripcion: 'Mantiene todo en orden detrás de escena.',
        foto: 'equipo/Elizabeth.jpg'
      },
      {
        nombre: 'Adrián Nicolas Tello',
        rol: 'Desarrollo web',
        descripcion: 'Trabaja en que la plataforma funcione bien.',
        foto: 'equipo/Nicolas.jpg'
      },
      {
        nombre: 'Matias Ibarra',
        rol: 'Ventas',
        descripcion: 'Ayuda a encontrar el producto indicado para cada mascota.',
        foto: 'equipo/Matias.jpg'
      },
      {
        nombre: 'Francisco Junco',
        rol: 'Soporte técnico',
        descripcion: 'Resuelve los problemas técnicos del día a día.',
        foto: 'equipo/Francisco.jpg'
      },
    ];
    return this.profesionalList;
  }
}