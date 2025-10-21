import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';

@Injectable({providedIn: 'root'})
export class SocketService {
  constructor() {
    this.socket = io('http://localhost:8999'); // Connect to Socket.IO server
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
