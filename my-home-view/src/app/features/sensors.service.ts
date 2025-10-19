import {inject, Injectable, signal} from '@angular/core';
import {SocketService} from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  constructor() {
  }

  messages = signal<{
    topic: string
    data: any
  }[]>([]);
  private readonly _socketService = inject(SocketService);

  listen() {
    this._socketService.onMessage((topic: string, data: string) => {
      this.messages.update((msgs) => [
        ...msgs,
        {
          topic,
          data: JSON.parse(data),
        },
      ]);
    });
  }

  listenTemperature(cb?: (data: unknown) => void) {
    this._socketService.onMessage((topic: string, data: string) => {
      if (topic === 'zigbee2mqtt/temperature_sensor') {
        if (cb) {
          try {
            cb(JSON.parse(data));
          } catch (e) {
            console.error('Error parsing temperature data:', e);
            cb('');
          }
        }
      }
    });
  }

  listenPresence(cb?: (data: unknown) => void) {
    this._socketService.onMessage((topic: string, data: string) => {
      if (topic === 'zigbee2mqtt/presence_sensor') {
        if (cb) {
          try {
            cb(JSON.parse(data));
          } catch (e) {
            console.error('Error parsing presence data:', e);
            cb('');
          }
        }
      }
    });
  }
}
