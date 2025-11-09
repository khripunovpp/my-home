import {Topic} from "./const/topics.const";
import {presenceSensorFromJson} from "./presence/presence-sensor.factory";
import {lightSensorFromJson} from "./light/light-sensor.factory";
import {BaseSensorModel} from "./sensors/base-sensor.model";
import {devicesFromJson} from "./devices/device.factory";
import {BaseModel} from "./base-model.model";
import {temperatureSensorFromJson} from "./temperature/temperature-sensor.factory";

export function topicMessageModelFactory<T>(topic: Topic, jsonString: string): T;
export function topicMessageModelFactory(topic: Topic, jsonString: string): BaseModel | BaseSensorModel {
  try {
    const json = JSON.parse(jsonString);

    switch (topic) {
      case 'zigbee2mqtt/temperature_sensor':
        return temperatureSensorFromJson(json);
      case 'zigbee2mqtt/presence_sensor':
        return presenceSensorFromJson(json);
      case 'zigbee2mqtt/office_lamp':
      case 'zigbee2mqtt/0x08fd52fffe3309e2':
        return lightSensorFromJson(json);
      case 'zigbee2mqtt/bridge/devices':
        return devicesFromJson(json);
      default:
        console.warn('No factory found for topic', topic);
        return new BaseSensorModel().fromJson(json);
    }
  } catch (e) {
    console.error('Failed to parse sensor data JSON', {topic, jsonString, error: e});
    return new BaseSensorModel();
  }

}