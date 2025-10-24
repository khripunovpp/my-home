import dotenv from 'dotenv';

dotenv.config({ debug: true });

interface MqTTClientConfig {
  mqtt_port: number
  mqtt_ip: string
  socket_port: number
  socket_ip: string
  nodeEnv: string
  client_origin: string
}

const config: MqTTClientConfig = {
  mqtt_port: Number(process.env.MQTT_PORT) || 1883,
  mqtt_ip: process.env.MQTT_IP || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  socket_port: Number(process.env.SOCKET_PORT) || 8999,
  client_origin: process.env.CLIENT_ORIGIN || 'http://localhost:4200',
  socket_ip: process.env.SOCKET_IP || '',
};

export default config;