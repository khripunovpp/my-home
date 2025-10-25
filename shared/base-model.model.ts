export class BaseModel {
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

  toJson() {
    const json: any = {};
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        if (typeof this[key] === 'string'
          || typeof this[key] === 'number'
          || typeof this[key] === 'boolean') {
          json[key] = this[key];
        } else if (this[key] instanceof Array) {
          json[key] = this[key].map((item: any) => {
            if (this.toJson) {
              return this.toJson.call(item);
            }
            return item;
          });
        } else if (typeof this[key] === 'object' && this[key] !== null) {
          json[key] = this.toJson?.call(this[key]) || this[key];
        } else {
          json[key] = null;
        }
      }
    }
    return json;
  }
}
