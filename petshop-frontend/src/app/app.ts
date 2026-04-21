import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './shared/header/header';
import { FooterComponent } from './shared/footer/footer';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent { }
