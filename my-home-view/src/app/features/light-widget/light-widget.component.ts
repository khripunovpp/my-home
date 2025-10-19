import {Component, inject, OnInit, signal} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {SensorsService} from '../../shared/sensors.service';

@Component({
  selector: 'my-light',
  template: `
    <div>
      {{ light() | json }}
    </div>`,
  imports: [
    JsonPipe
  ],
  styles: [`
  `]
})
export class LightWidgetComponent
  implements OnInit {
  constructor() {
  }

  readonly sensorsService = inject(SensorsService);
  readonly light = signal({
    state: 'OFF',
  });

  ngOnInit(): void {
    this.sensorsService.listenOfficeLight((data => {
      this.light.set(data as any);
    }));
  }
}
