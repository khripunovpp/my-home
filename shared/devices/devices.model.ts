import {BaseModel} from "../base-model.model";

export class DevicesModel
  extends BaseModel {

  devices: any[] = [];

  putDevice(device: any): void {
    this.devices.push(device);
  }
}