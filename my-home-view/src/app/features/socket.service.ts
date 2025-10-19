import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';

@Injectable({providedIn: 'root'})
export class SocketService {
  constructor() {
    this.socket = io('http://localhost:8999'); // Connect to Socket.IO server
  }

  private socket: Socket;

  // Method to send message to the server
  sendMessage(message: string): void {
    this.socket.emit('mqttMessage', message);
  }

  // Observable to receive messages from the server
  onMessage(callback: (topic: string, data: string) => void): void {
    this.socket.on('mqttMessage', callback);
  }
}
