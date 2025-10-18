import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TemperatureComponent} from '../features/temperature.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TemperatureComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('my-home-view');
}
