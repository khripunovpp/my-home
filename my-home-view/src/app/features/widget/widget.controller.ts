import {Injectable, signal} from '@angular/core';
import {DeviceSingleModel} from '../../../../../shared/devices/device-single.model';

@Injectable()
export class WidgetController {
  constructor() {
  }

  private _device = signal<DeviceSingleModel | null>(null);

  get device() {
    return this._device;
  }

  bind(
    device: DeviceSingleModel
  ) {
    this._device.set(device);
  }

  rename(
    newName: string
  ) {

  }

  delete() {

  }
}
