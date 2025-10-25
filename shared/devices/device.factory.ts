import {DevicesModel} from "./devices.model";

export const devicesFromJson = (json?: any[]): DevicesModel => {
  const model = new DevicesModel();
  for (const device of (json || [])) {
    model.putDevice(device);
  }
  return model;
}
