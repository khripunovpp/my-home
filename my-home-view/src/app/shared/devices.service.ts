import {inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {topicMessageModelFactory} from '../../../../shared/topic-message-model.factory';
import {DevicesModel} from '../../../../shared/devices/devices.model';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  constructor() {
  }

  private readonly _apiService = inject(ApiService);

  getDevices() {
    return this._apiService.get('home/devices').pipe(
      map((raw: any) => this._toModel(raw))
    );
  }

  private _toModel(raw: any) {
    const payload = raw['payload'];
    return topicMessageModelFactory<DevicesModel>('zigbee2mqtt/bridge/devices', payload);
  }
}
