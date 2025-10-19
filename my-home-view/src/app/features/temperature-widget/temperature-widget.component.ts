import {Component, inject, OnInit, signal} from '@angular/core';
import {SensorsService} from '../../shared/sensors.service';

@Component({
  selector: 'my-temperature',
  template: `
    <div>
      @let temp = temperature();

      <div class="temperature-data">
        <span>Temperature: {{ temp.temperature }} °C</span>
        <span>Humidity: {{ temp.humidity }} %</span>
      </div>
    </div>`,
  imports: [],
  styles: [`
    .temperature-data {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-direction: column;

    }
  `]
})
export class TemperatureWidgetComponent
  implements OnInit {
  constructor() {
  }

  readonly sensorsService = inject(SensorsService);
  readonly temperature = signal({
    temperature: null,
    humidity: null,
  });

  ngOnInit(): void {
    this.sensorsService.listenTemperature((data => {
      this.temperature.set(data as any);
    }));
  }
}
