import {ZigbeeDevice} from "../devices/devices.types";

export const estimateDeviceType = (device?: ZigbeeDevice): string => {
  const desc = device?.definition?.description;

  if (desc) {
    if (desc.indexOf('motion') !== -1) {
      return 'motion';
    }
    if (desc.indexOf('temperature') !== -1
      || desc.indexOf('humidity') !== -1) {
      return 'temperature';
    }
    if (desc.indexOf('contact') !== -1) {
      return 'contact';
    }
    if (desc.indexOf('switch') !== -1) {
      return 'switch';
    }
    if (desc.indexOf('light') !== -1) {
      return 'light';
    }
  }

  return 'unknown';
}