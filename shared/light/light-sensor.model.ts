import {BaseSensorModel} from "../sensors/base-sensor.model";

export class LightSensorModel
  extends BaseSensorModel {
  state: 'ON' | 'OFF' = 'OFF';
  brightness: number = 0;
}
