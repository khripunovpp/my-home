import json

import paho.mqtt.client as mqtt

# Параметры
MQTT_BROKER = "192.168.1.230"
MQTT_PORT = 1883

TOPICS = [
    ("zigbee2mqtt/temperature_sensor", 0),
    ("zigbee2mqtt/presence_sensor", 0),
    ("zigbee2mqtt/office_lamp", 0)
]


# Функции обратного вызова
def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc} : {TOPICS}")
    client.subscribe(TOPICS)


def on_message(client, userdata, msg):
    try:
        data = json.loads(msg.payload)
        if msg.topic == "zigbee2mqtt/temperature_sensor":
            temperature = data.get("temperature")
            humidity = data.get("humidity")
            print(f"Temperature: {temperature}°C, Humidity: {humidity}%")
        elif msg.topic == "zigbee2mqtt/presence_sensor":
            presence = data.get("presence")
            if presence:
                set_white(4000, brightness=200)
            else:
                switch_off()
            print(f"Presence detected: {presence}")
        elif msg.topic == "zigbee2mqtt/office_lamp":
            state = data.get("state")
            brightness = data.get("brightness")
            color_mode = data.get("color_mode")
            print(f"Lamp state: {state}, Brightness: {brightness}, Color mode: {color_mode}")
    except json.JSONDecodeError:
        print(f"Received non-JSON message on topic {msg.topic}: {msg.payload}")
    except Exception as e:
        print(f"Error processing message on topic {msg.topic}: {e}")

    print(f"Topic: {msg.topic}, Payload: {msg.payload.decode()}")


def set_color(r, g, b, brightness=254):
    client.publish("zigbee2mqtt/office_lamp/set", json.dumps({
        "state": "ON",
        "mode": "color",
        "color": {"r": r, "g": g, "b": b},
        "brightness": brightness
    }))


def set_white(color_temp, brightness=254):
    client.publish("zigbee2mqtt/office_lamp/set", json.dumps({
        "state": "ON",
        "mode": "white",
        "color_temp": color_temp,
        "brightness": brightness
    }))


def switch_off():
    client.publish("zigbee2mqtt/office_lamp/set", json.dumps({
        "state": "OFF"
    }))


# Настройка клиента
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

# Подключение и запуск
client.connect(MQTT_BROKER, MQTT_PORT, 60)
client.loop_forever()
