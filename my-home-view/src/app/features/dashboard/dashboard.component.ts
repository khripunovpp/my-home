import {ChangeDetectionStrategy, Component, computed, inject, resource} from '@angular/core';
import {GridCellComponent} from '../grid/grid-cell.component';
import {HomeGridComponent} from '../grid/home-grid.component';
import {LightWidgetComponent} from '../light/light-widget/light-widget.component';
import {PairButtonComponent} from '../pair-button/pair-button.component';
import {PresenceWidgetComponent} from '../presence-widget/presence-widget.component';
import {TemperatureWidgetComponent} from '../temperature-widget/temperature-widget.component';
import {firstValueFrom} from 'rxjs';
import {DashboardService} from './dashboard.service';
import {NgComponentOutlet} from '@angular/common';

@Component({
  selector: 'my-home-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <my-home-pair-button></my-home-pair-button>

    <my-home-grid>
      @for (widget of widgets(); track widget) {
        @switch (widget.type) {
          @case ('light') {
            <my-grid-cell>
              <ng-container
                *ngComponentOutlet="LightWidgetComponent; inputs: {device:widget.device}"></ng-container>
            </my-grid-cell>
          }
          @case ('motion') {
            <my-grid-cell>
              <ng-container
                *ngComponentOutlet="PresenceWidgetComponent; inputs: {device:widget.device}"></ng-container>
            </my-grid-cell>
          }
          @case ('temperature') {
            <my-grid-cell>
              <ng-container
                *ngComponentOutlet="TemperatureWidgetComponent; inputs: {device:widget.device}"></ng-container>
            </my-grid-cell>
          }
        }
      }
    </my-home-grid>
  `,
  imports: [
    GridCellComponent,
    HomeGridComponent,
    PairButtonComponent,
    NgComponentOutlet
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

  protected readonly LightWidgetComponent = LightWidgetComponent;
  protected readonly PresenceWidgetComponent = PresenceWidgetComponent;
  protected readonly TemperatureWidgetComponent = TemperatureWidgetComponent;
  private readonly _dashboardService = inject(DashboardService);
  private resource = resource({
    params: () => ({}),
    loader: ({params}) => firstValueFrom(this._dashboardService.getWidgets()),
  });
  readonly widgets = computed(() => {
    if (this.resource.hasValue()) {
      return this.resource.value();
    }
    return undefined;
  });
}
