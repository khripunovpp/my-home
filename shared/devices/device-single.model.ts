import {BaseModel} from "../base-model.model";
import {ZigbeeDevice} from "./devices.types";

export class DeviceSingleModel
  extends BaseModel {

  device?: ZigbeeDevice;
}