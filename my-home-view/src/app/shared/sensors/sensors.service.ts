import {inject, Injectable, signal} from '@angular/core';
import {SocketService} from '../socket.service';

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  constructor() {
  }

// pashtitto@pashtitto:~ $ mosquitto_pub -h localhost -t "zigbee2mqtt/bridge/request/permit_join" -m '{"value":true,"time":120}'
  messages = signal<{
    topic: string
    data: any
  }[]>([]);
  private readonly _socketService = inject(SocketService);
  private readonly _topics = {
    temperature: 'zigbee2mqtt/temperature_sensor',
    presence: 'zigbee2mqtt/presence_sensor',
    office_lamp: 'zigbee2mqtt/office_lamp',
  };

  listenSensor(
    sensorName: string,
    cb?: (data: unknown) => void,
  ) {
    const topic = this._topics[sensorName as keyof typeof this._topics];
    this._socketService.onMessage((incomingTopic: string, data: string) => {
      if (topic === incomingTopic) {
        if (cb) {
          try {
            const parsedData = JSON.parse(data);
            this._storeLastMessage(topic, parsedData);
            cb(parsedData);
          } catch (e) {
            console.error('Error parsing temperature data:', e);
            cb('');
          }
        }
      }
    });

    if (cb) {
      const lastMessage = this._retrieveLastMessage(topic);
      if (lastMessage) {
        cb(lastMessage);
      }
    }
  }

  sendCommand(
    sensorName: string,
    data: Record<string, any>,
  ) {
    const topic = this._topics[sensorName as keyof typeof this._topics];
    const message = JSON.stringify(data);
    this._socketService.sendMessage({
      topic: topic + '/set',
      message,
    });
  }

  pairDevice() {
    this._socketService.sendMessage({
      topic: 'zigbee2mqtt/bridge/request/permit_join',
      message: JSON.stringify({value: true, time: 120}),
    });
  }

  requestIEEAddress() {
    this._socketService.sendMessage({
      topic: 'zigbee2mqtt/bridge/devices',
      message:  JSON.stringify(''),
    });
  }

  disconnectDevice(
    ieeeAddress: string,
  ) {
    this._socketService.sendMessage({
      topic: 'zigbee2mqtt/bridge/request/remove',
      message: JSON.stringify({ieee_address: ieeeAddress}),
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
