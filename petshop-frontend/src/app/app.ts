import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuienesSomosComponent } from './components\quienes-somos/quienes-somos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, QuienesSomosComponent], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent { }