import {inject, Injectable} from '@angular/core';
import {SENSOR_NAME} from './sensor-name.token';
import {SensorsService} from './sensors.service';

@Injectable()
export class LightSensorService {
  constructor() {
  }

  private readonly _sensorsService = inject(SensorsService);
  private readonly _name = inject<string>(SENSOR_NAME);

  listen(
    cb: (data: unknown) => void
  ) {
    this._sensorsService.listenSensor(this._name, cb);
  }

  switchLight(state: 'ON' | 'OFF') {
    this._sensorsService.sendCommand(this._name, {
      state,
      brightness: 254,
    });
  }

}
