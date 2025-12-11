import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConfiguracionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'juegoAdivinacion';
}
