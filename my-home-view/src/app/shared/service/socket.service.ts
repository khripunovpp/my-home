import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import env from '../../../env';

@Injectable({providedIn: 'root'})
export class SocketService {
  constructor() {
    this.socket = io(`http://${env.socket_ip}:${env.socket_port}`);
  }

  private socket: Socket;

  sendMessage(
    message: {
      topic: string
      message: string
    }
  ): void {
    this.socket.emit('mqttMessage', message.topic, message.message);
  }

  onMessage(callback: (topic: string, data: string) => void): void {
    this.socket.on('mqttMessage', callback);
  }
}
