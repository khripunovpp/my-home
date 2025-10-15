import json

import paho.mqtt.client as mqtt
from pydantic import BaseModel

from src.models.TemperatureSensorResult import TemperatureSensorResult

# Параметры
MQTT_BROKER = "localhost"
MQTT_PORT = 1883
DEVICE_TOPIC = "zigbee2mqtt/temperature_sensor"  # замени на имя твоего устройства




# Функции обратного вызова
def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    client.subscribe(DEVICE_TOPIC)


def on_message(client, userdata, msg):
    try:
        payload = TemperatureSensorResult(msg.payload.decode())  # превращаем JSON-строку в dict
    except json.JSONDecodeError:
        print(f"Invalid JSON: {msg.payload.decode()}")
        return
    presence = payload.get("presence", False)
    print(f"Topic: {msg.topic}, Payload: {msg.payload.decode()}")
    if presence:
        print("Хуйло детектед!")
    else:
        print("No presence detected.")


# Настройка клиента
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

# Подключение и запуск
client.connect(MQTT_BROKER, MQTT_PORT, 60)
client.loop_forever()
