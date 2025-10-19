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
  private readonly _topics = {
    temperature: 'zigbee2mqtt/temperature_sensor',
    presence: 'zigbee2mqtt/presence_sensor',
    office_light: 'zigbee2mqtt/office_lamp',
  };

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
      if (topic === this._topics.temperature) {
        if (cb) {
          try {
            const parsedData = JSON.parse(data);
            this._storeLastMessage(this._topics.temperature, parsedData);
            cb(parsedData);
          } catch (e) {
            console.error('Error parsing temperature data:', e);
            cb('');
          }
        }
      }
    });

    if (cb) {
      const lastMessage = this._retrieveLastMessage(this._topics.temperature);
      if (lastMessage) {
        cb(lastMessage);
      }
    }
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

  listenOfficeLight(cb?: (data: unknown) => void) {
    this._socketService.onMessage((topic: string, data: string) => {
      if (topic === this._topics.office_light) {
        if (cb) {
          try {
            cb(JSON.parse(data));
          } catch (e) {
            console.error('Error parsing office light data:', e);
            cb('');
          }
        }
      }
    });
  }

  private _keyFactory(topic: string) {
    return `sensors:${topic}`;
  }

  private _storeLastMessage(topic: string, data: any) {
    try {
      const key = this._keyFactory(topic);
      const storedData = {
        timestamp: new Date().toISOString(),
        data,
      };
      localStorage.setItem(key, JSON.stringify(storedData));
    } catch (e) {
      console.error('Error storing message in localStorage:', e);
    }
  }

  private _retrieveLastMessage(topic: string): any | null {
    try {
      const key = this._keyFactory(topic);
      const data = localStorage.getItem(key);
      const parsedData = data ? JSON.parse(data) : null;

      return parsedData?.data || null;
    } catch (e) {
      console.error('Error retrieving message from localStorage:', e);
      return null;
    }
  }
}
