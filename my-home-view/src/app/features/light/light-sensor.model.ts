export abstract class SensorModel {
  ieee_address: string = '';
  friendly_name: string = '';
}

export class BaseSensorModel
  extends SensorModel {

  fromJson(json: any) {
    try {
      const keys = Object.keys(json);
      for (const key of keys) {
        if (key in this) {
          // @ts-ignore
          this[key] = json[key];
        }
      }
      return this;
    } catch (e) {
      console.error('Error parsing sensor data:', e);
      return this;
    }
  }
}

export class LightSensorModel
  extends BaseSensorModel {
  state: 'ON' | 'OFF' = 'OFF';
  brightness: number = 0;
}
