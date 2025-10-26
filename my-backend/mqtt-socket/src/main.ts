import mqtt from 'mqtt';
import config from './config';
import socketIO from './socket';
import {putData} from '../../db/db';

const url = `mqtt://${config.mqtt_ip}:${config.mqtt_port}`;
const client = mqtt.connect(url);
console.log("MQTT client connecting to:", url);

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  client.subscribe("zigbee2mqtt/#", {qos: 0}, (err, granted) => {
    if (err) {
      console.error("Subscribe error:", err);
    } else {
      console.log(`Subscribed to topic:`, granted?.[0]?.topic);
    }
  });
});

socketIO.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("mqttMessage", (topic, message) => {
    console.log("Received from socket.io client:", topic, message);
    client.publish(topic, message);
  });
});

client.on("message", (topic, message) => {
  const msgString = message.toString();
  console.log("Received from MQTT broker:", topic, msgString);
  putData(topic, msgString);
  socketIO.emit("mqttMessage", topic, msgString);
});