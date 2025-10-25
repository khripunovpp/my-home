import {Server} from "socket.io";
import config from './config';

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  mqttMessage: (topic: string, message: string) => void;
}

interface ClientToServerEvents {
  ping: () => void;
  mqttMessage: (topic: string, message: string) => void;
}

interface InterServerEvents {
  ping: () => void;
  mqttMessage: (topic: string, message: string) => void;
}

interface SocketData {
  name: string;
  age: number;
}

const options = {
  cors: {
    origin: config.client_origin, // сюда твой Angular
    methods: ["GET", "POST"],
    credentials: true, // если используешь куки
  }
};
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(config.socket_port, options);
console.log("Socket.io server initialized", {options});

export default io;