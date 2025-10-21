import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {LightSensorService} from '../../shared/sensors/light-sensor.service';
import {SENSOR_NAME} from '../../shared/sensors/sensor-name.token';
import {SensorsService} from '../../shared/sensors/sensors.service';

@Component({
  selector: 'my-light',
  template: `
    <div>
      <button (click)="toggleLight()" class="light-switch-button">
        <svg fill="#000000" height="24px" version="1.1" viewBox="0 0 32 32" width="24px"
             xmlns="http://www.w3.org/2000/svg">
          <title>switch1</title>
          <path
            d="M15.5 31.062c-6.904 0-12.5-5.597-12.5-12.5 0-5.315 3.323-9.844 8-11.651v4.449c-2.399 1.503-4 4.162-4 7.202 0 4.694 3.806 8.5 8.5 8.5s8.5-3.806 8.5-8.5c0-2.596-1.166-4.915-3-6.475v-4.736c4.143 2.036 7 6.284 7 11.212 0 6.903-5.597 12.499-12.5 12.499zM16 17.062c-1.104 0-2-0.896-2-2v-11.124c0-1.104 0.896-2 2-2s2 0.896 2 2v11.125c0 1.104-0.896 1.999-2 1.999z"></path>
        </svg>
        <div>
          {{ lightIsOn() ? 'Switch Off' : 'Switch On' }}
        </div>
      </button>
    </div>`,
  imports: [],
  styles: [`
    .light-switch-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 24px;
      font-size: 18px;
      font-family: inherit;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      svg {
        margin-bottom: 8px;
      }
    }
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

  private readonly _sensorsService = inject(SensorsService);
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
