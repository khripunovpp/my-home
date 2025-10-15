from pydantic import BaseModel


class TemperatureSensorResult(BaseModel):
    temperature: float
    humidity: float

    def __init__(self, temperature: float, humidity: float):
        super().__init__(temperature=temperature, humidity=humidity)

    def is_hot(self) -> bool:
        return self.temperature > 25.0
