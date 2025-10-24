import {LightSensorModel} from './light-sensor.model';

export const lightSensorFromJson = (json?: any): LightSensorModel => {
  const sensor = new LightSensorModel();
  return sensor.fromJson(json || {});
}
