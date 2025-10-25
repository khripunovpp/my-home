import mqtt from 'mqtt';
import config from './config';
import socketIO from './socket';
import {putData} from '../../db/db';

const url = `mqtt://${config.mqtt_ip}:${config.mqtt_port}`;
const client = mqtt.connect(url);
console.log("MQTT client connecting to:", url);

const TOPICS = [
  "zigbee2mqtt/temperature_sensor",
  "zigbee2mqtt/presence_sensor",
  "zigbee2mqtt/office_lamp",
  "zigbee2mqtt/bridge/devices",
];

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  // Подписываемся на все топики
  TOPICS.forEach(topic => {
    console.log(`Subscribing to ${topic}`);
    client.subscribe(topic, {qos: 0}, (err, granted) => {
      if (err) {
        console.error("Subscribe error:", err);
      } else {
        console.log(`Subscribed to ${topic}`, granted);
      }
    });
  });
});

// Не закрываем клиент после первого сообщения
// client.end() — удаляем

socketIO.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("mqttMessage", (topic, message) => {
    console.log("Received from socket.io client:", topic, message);
    client.publish(topic, message);
  });
});

client.on("message", (topic, message) => {
  const msgString = message.toString();
  // сохраняем сообщение в БД
  putData(topic, msgString);
  console.log("Received from MQTT broker:", topic, msgString);
  socketIO.emit("mqttMessage", topic, msgString);
});

// on recieving messages from soket.io clients
socketIO.on("new_namespace", (...args) => {
  console.log("New namespace created", args);
  // client.publish(topic, message);
});