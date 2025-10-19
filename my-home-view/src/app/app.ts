import {Component, signal} from '@angular/core';
import {TemperatureWidgetComponent} from './features/temperature-widget/temperature-widget.component';
import {PresenceWidgetComponent} from './features/presence-widget/presence-widget.component';
import {HomeGridComponent} from './features/grid/home-grid.component';
import {GridCellComponent} from './features/grid/grid-cell.component';
import {LightWidgetComponent} from './features/light-widget/light-widget.component';

@Component({
  selector: 'app-root',
  imports: [TemperatureWidgetComponent, PresenceWidgetComponent, HomeGridComponent, GridCellComponent, LightWidgetComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('my-home-view');
}
