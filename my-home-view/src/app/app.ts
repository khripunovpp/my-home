import {Component, signal} from '@angular/core';
import {TemperatureWidgetComponent} from './features/temperature-widget/temperature-widget.component';
import {PresenceWidgetComponent} from './features/presence-widget/presence-widget.component';
import {HomeGridComponent} from './features/grid/home-grid.component';
import {GridCellComponent} from './features/grid/grid-cell.component';
import {LightWidgetComponent} from './features/light/light-widget/light-widget.component';
import {PairButtonComponent} from './features/pair-button/pair-button.component';
import {DevicesComponent} from './features/devices/devices.component';

@Component({
  selector: 'app-root',
  imports: [TemperatureWidgetComponent, PresenceWidgetComponent, HomeGridComponent, GridCellComponent, LightWidgetComponent, PairButtonComponent, DevicesComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('my-home-view');
}
