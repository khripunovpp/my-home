import {BaseSensorModel} from "../sensors/base-sensor.model";

export class TemperatureSensorModel
  extends BaseSensorModel {
  battery: number = 0;
  humidity: number = 0;
  linkquality: number = 0;
  temperature: number = 0;
  voltage: number = 0;
}
