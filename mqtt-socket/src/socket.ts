import {Server} from "socket.io";

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

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(8999, {
  cors: {
    origin: "http://localhost:4200", // сюда твой Angular
    methods: ["GET", "POST"],
    credentials: true, // если используешь куки
  }
});
console.log("Socket.io server initialized");

export default io;