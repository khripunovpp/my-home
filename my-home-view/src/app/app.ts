import {Component, signal} from '@angular/core';
import {TemperatureComponent} from './features/temperature.component';
import {PresenceComponent} from './features/presence.component';
import {HomeGridComponent} from './features/grid/home-grid.component';
import {GridCellComponent} from './features/grid/grid-cell.component';
import {LightComponent} from './features/light.component';

@Component({
  selector: 'app-root',
  imports: [TemperatureComponent, PresenceComponent, HomeGridComponent, GridCellComponent, LightComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('my-home-view');
}
