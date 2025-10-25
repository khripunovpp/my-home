import {TemperatureSensorModel} from './temperature-sensor.model';

export const temperatureSensorFromJson = (json?: any): TemperatureSensorModel => {
  const sensor = new TemperatureSensorModel();
  return sensor.fromJson(json || {});
}
