from pydantic import BaseModel


class TemperatureSensorResult(BaseModel):
    temperature: float
    humidity: float

    def is_hot(self) -> bool:
        return self.temperature > 25.0
