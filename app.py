from __future__ import annotations

from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

API_TOKEN = os.getenv("API_TOKEN", "supersecret")  # замените в проде

app = FastAPI(title="Моё локальное API")

# Разрешаем доступ из локальной сети — можно адаптировать origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # в локалке удобно *, но по безопасности конкретный origin лучше
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Echo(BaseModel):
    msg: str

def check_token(x_token: str | None):
    if x_token != API_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/")
def root():
    return {"hello": "world"}

@app.post("/echo")
def echo(payload: Echo, x_token: str | None = Header(None)):
    check_token(x_token)
    return {"you_sent": payload.msg}

# Пример endpoint без токена
@app.get("/status")
def status():
    return {"status": "ok"}