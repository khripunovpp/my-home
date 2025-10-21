import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {LightSensorService} from '../../shared/sensors/light-sensor.service';
import {SENSOR_NAME} from '../../shared/sensors/sensor-name.token';

@Component({
  selector: 'my-light',
  template: `
    <div>
      {{ lightIsOn() ? '💡 Light is ON' : '💤 Light is OFF' }}

      <button (click)="toggleLight()">Toggle Light</button>
    </div>`,
  imports: [],
  styles: [`
  `],
  providers: [
    LightSensorService,
    {
      provide: SENSOR_NAME,
      useValue: 'office_lamp',
    },
  ]
})
export class LightWidgetComponent
  implements OnInit {
  constructor() {
  }

  readonly sensorsService = inject(LightSensorService);
  readonly light = signal({
    state: 'OFF',
  });
  readonly lightIsOn = computed(() => this.light().state === 'ON');

  ngOnInit(): void {
    this.sensorsService.listen((data => {
      this.light.set(data as any);
    }));
  }

  toggleLight() {
    const newState = this.light().state === 'ON' ? 'OFF' : 'ON';
    this.sensorsService.switchLight(newState);
  }
}
