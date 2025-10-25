import {Component, computed, inject, resource} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {firstValueFrom} from 'rxjs';
import {JsonPipe} from '@angular/common';
import {topicMessageModelFactory} from '../../../../../shared/topic-message-model.factory';
import {DevicesModel} from '../../../../../shared/devices/devices.model';

@Component({
  selector: 'my-home-devices',
  template: `
    @for (device of devicesModel()?.devices; track device) {
      <div class="device-card">
        <div>{{ device.friendly_name }} - {{ device.ieee_address }}</div>
        {{ device | json }}
      </div>
      <hr>
      <br>
      <br>
    }
  `,
  imports: [
    JsonPipe
  ],
  styles: [`
  `]
})
export class DevicesComponent {
  constructor() {
  }

  private readonly _apiService = inject(ApiService);
  private resource = resource({
    params: () => ({}),
    loader: ({params}) => firstValueFrom(this._apiService.get('home/devices')),
  });
  readonly devicesModel = computed<DevicesModel | undefined>(() => {
    if (this.resource.hasValue()) {
      try {
        const raw = this.resource.value() as any;
        const payload = raw['payload'];
        return topicMessageModelFactory<DevicesModel>('zigbee2mqtt/bridge/devices', payload);
      } catch (e) {
        console.error('Error parsing device data', e);
        return undefined;
      }
    }
    return undefined;
  });
}
