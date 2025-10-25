import {BaseSensorModel} from "../sensors/base-sensor.model";

export class PresenceSensorModel
  extends BaseSensorModel {
  battery: number = 0;
  fading_time: number = 0;
  illuminance: number = 0;
  illuminance_interval: number = 0;
  indicator: 'ON' | 'OFF' = 'OFF';
  linkquality: number = 0;
  motion_detection_sensitivity: number = 0;
  presence: boolean = false;
}
