import {PresenceSensorModel} from './presence-sensor.model';

export const presenceSensorFromJson = (json?: any): PresenceSensorModel => {
  const sensor = new PresenceSensorModel();
  return sensor.fromJson(json || {});
}
