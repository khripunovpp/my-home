import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TemperatureComponent} from '../features/temperature.component';
import {PresenceComponent} from '../features/presence.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TemperatureComponent, PresenceComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('my-home-view');
}
