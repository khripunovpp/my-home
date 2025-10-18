import dotenv from 'dotenv';

dotenv.config({ debug: true });

interface MqTTClientConfig {
  port: number
  ip: string
  nodeEnv: string
}

const config: MqTTClientConfig = {
  port: Number(process.env.MQTT_PORT) || 1883,
  ip: process.env.MQTT_IP || '',
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default config;