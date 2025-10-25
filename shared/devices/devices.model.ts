import {BaseModel} from "../base-model.model";
import {ZigbeeDevice} from "./devices.types";

export class DevicesModel
  extends BaseModel {

  devices: ZigbeeDevice[] = [];

  putDevice(device: any): void {
    this.devices.push(device);
  }
}