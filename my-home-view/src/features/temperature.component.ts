import {Component, inject} from '@angular/core';
import {SensorsService} from './sensors.service';

@Component({
  selector: 'my-temperature',
  template: `
    <div>Temperature Component</div>`,
  styles: [``]
})
export class TemperatureComponent {
  constructor() {
  }

  private readonly _sensorsService = inject(SensorsService);
}
