import {inject, Injectable} from '@angular/core';
import {DevicesService} from '../../shared/service/devices.service';
import {map} from 'rxjs';
import {estimateDeviceType} from '../../../../../shared/helpers/devices.helpers';
import {DevicesModel} from '../../../../../shared/devices/devices.model';
import {DeviceSingleModel} from '../../../../../shared/devices/device-single.model';

export interface Widget {
  device: DeviceSingleModel
  type?: string
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor() {
  }

  private readonly _devicesService = inject(DevicesService);

  getWidgets() {
    return this._devicesService.getDevices().pipe(
      map(devicesModel => this._toWidgets(devicesModel)
        .sort((a, b) => a.type === 'temperature' ? -1 : 1))
    );
  }

  private _toWidgets(devicesModel: DevicesModel): Widget[] {
    console.log('Converting devices to widgets:', devicesModel.devices);
    return devicesModel.devices.map(device => ({
      device,
      type: estimateDeviceType(device.device),
    }));
  }
}
