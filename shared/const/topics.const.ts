export const TOPICS = [
  "zigbee2mqtt/temperature_sensor",
  "zigbee2mqtt/presence_sensor",
  "zigbee2mqtt/office_lamp",
  "zigbee2mqtt/bridge/devices",
];

export type Topic = {
  [index: number]: typeof TOPICS[number]
}