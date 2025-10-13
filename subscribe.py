import paho.mqtt.client as mqtt

# Параметры
MQTT_BROKER = "localhost"
MQTT_PORT = 1883
DEVICE_TOPIC = "zigbee2mqtt/presence_sensor"  # замени на имя твоего устройства

# Функции обратного вызова
def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    client.subscribe(DEVICE_TOPIC)

def on_message(client, userdata, msg):
    print(f"Topic: {msg.topic}, Payload: {msg.payload.decode()}")

# Настройка клиента
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

# Подключение и запуск
client.connect(MQTT_BROKER, MQTT_PORT, 60)
client.loop_forever()