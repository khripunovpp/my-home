import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  ip: string;
  nodeEnv: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  ip: process.env.IP || 'localhost',
};

export default config;