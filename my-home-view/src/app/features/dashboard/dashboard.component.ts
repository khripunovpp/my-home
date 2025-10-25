import {Component, computed, inject, resource} from '@angular/core';
import {GridCellComponent} from '../grid/grid-cell.component';
import {HomeGridComponent} from '../grid/home-grid.component';
import {LightWidgetComponent} from '../light/light-widget/light-widget.component';
import {PairButtonComponent} from '../pair-button/pair-button.component';
import {PresenceWidgetComponent} from '../presence-widget/presence-widget.component';
import {TemperatureWidgetComponent} from '../temperature-widget/temperature-widget.component';
import {firstValueFrom} from 'rxjs';
import {DashboardService} from '../../shared/dashboard.service';

@Component({
  selector: 'my-home-dashboard',
  template: `
    <my-home-pair-button></my-home-pair-button>

    <my-home-grid>
      @for (widget of widgets(); track widget) {
        @switch (widget.type) {
          @case ('light') {
            <my-grid-cell>
              <my-light [device]="widget.device"></my-light>
            </my-grid-cell>
          }
          @case ('motion') {
            <my-grid-cell>
              <my-presence></my-presence>
            </my-grid-cell>
          }
          @case ('temperature') {
            <my-grid-cell>
              <my-temperature></my-temperature>
            </my-grid-cell>
          }
        }
      }

      <!--      <my-grid-cell>-->
      <!--        <my-light></my-light>-->
      <!--      </my-grid-cell>-->
      <!--      -->
      <!--      <my-grid-cell>-->
      <!--        <my-presence></my-presence>-->
      <!--      </my-grid-cell>-->
    </my-home-grid>
  `,
  imports: [
    GridCellComponent,
    HomeGridComponent,
    LightWidgetComponent,
    PairButtonComponent,
    PresenceWidgetComponent,
    TemperatureWidgetComponent
  ],
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
      justify-content: center;
      padding: 16px;
      background-color: #f5f5f5;
    }

  `]
})
export class DashboardComponent {
  constructor() {
  }

  private readonly _dashboardService = inject(DashboardService);
  private resource = resource({
    params: () => ({}),
    loader: ({params}) => firstValueFrom(this._dashboardService.getWidgets()),
  });
  readonly widgets = computed(() => {
    if (this.resource.hasValue()) {
      console.log('Widgets loaded:', this.resource.value());
      return this.resource.value();
    }
    return undefined;
  });
}
