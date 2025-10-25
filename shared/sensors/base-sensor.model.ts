import {BaseModel} from "../base-model.model";

export abstract class SensorModel {
  ieee_address: string = '';
  friendly_name: string = '';
}

export class BaseSensorModel
  extends BaseModel
  implements SensorModel {
  ieee_address: string = '';
  friendly_name: string = '';
}
