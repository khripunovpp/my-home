import {inject, Injectable} from '@angular/core';
import {SensorsService} from './sensors.service';

@Injectable({
  providedIn: 'root',
})
export class LightSensorService {
  constructor() {
  }

  private readonly _sensorsService = inject(SensorsService);
  private _tempMin = 153;
  private _tempMax = 500;

  getBoundaries() {
    return {
      min: this._tempMin,
      max: this._tempMax,
    };
  }

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
    });
  }

  adjustTemperature(
    name: string,
    color_temp_kelvin: number
  ) {
    const fromKelvin = 1000000 / color_temp_kelvin;
    const clampedTemp = Math.max(this._tempMin, Math.min(this._tempMax, fromKelvin));
    this._sensorsService.sendCommand(name, {
      color_temp: Math.abs(Math.ceil(clampedTemp)),
    });
  }

  adjustBrightness(
    name: string,
    brightness: number
  ) {
    const clampedBrightness = Math.max(0, Math.min(254, brightness));
    this._sensorsService.sendCommand(name, {
      brightness: Math.abs(Math.ceil(clampedBrightness)),
    });
  }

  changeColor(
    name: string,
    color: { r: number; g: number; b: number }
  ) {
    this._sensorsService.sendCommand(name, {
      color: {
        r: Math.abs(Math.ceil(color.r)),
        g: Math.abs(Math.ceil(color.g)),
        b: Math.abs(Math.ceil(color.b)),
      },
    });
  }
}
