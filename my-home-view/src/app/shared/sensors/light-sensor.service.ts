import {inject, Injectable} from '@angular/core';
import {SensorsService} from './sensors.service';

@Injectable({
  providedIn: 'root',
})
export class LightSensorService {
  constructor() {
  }

  private readonly _sensorsService = inject(SensorsService);

  listen(
    name: string,
    cb: (data: unknown) => void
  ) {
    this._sensorsService.listenSensor(name, cb);
  }

  switchLight(
    name: string,
    state: 'ON' | 'OFF'
  ) {
    this._sensorsService.sendCommand(name, {
      state,
      brightness: 254,
    });
  }
}
