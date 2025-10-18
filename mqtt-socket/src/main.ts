import mqtt from 'mqtt';
import config from './config';
import socketIO from './socket';

const client = mqtt.connect(`mqtt://${config.ip}:${config.port}`);
const TOPICS = [
  "zigbee2mqtt/temperature_sensor",
  "zigbee2mqtt/presence_sensor",
  "zigbee2mqtt/office_lamp"
];

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  // Подписываемся на все топики
  TOPICS.forEach(topic => {
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
  client.on("message", (topic, message) => {
    socket.emit("mqttMessage", topic, message.toString());
  });
});
