import {BaseModel} from "../base-model.model";
import {DeviceSingleModel} from "./device-single.model";

export class DevicesModel
  extends BaseModel {

  devices: DeviceSingleModel[] = [];

  putDevice(device: any): void {
    const model = new DeviceSingleModel();
    model.device = device;
    this.devices.push(model);
  }
}