import Database from "better-sqlite3";
import * as path from "node:path";

export const dbInstance = new Database(path.join(__dirname, 'sensors.db'), {
  verbose: console.warn,
});

// Создаём таблицу истории, если нет
dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS history
    (
        id
        INTEGER
        PRIMARY
        KEY
        AUTOINCREMENT,
        topic
        TEXT
        NOT
        NULL,
        payload
        TEXT
        NOT
        NULL,
        timestamp
        DATETIME
        DEFAULT
        CURRENT_TIMESTAMP
    )
`);

export function putData(topic: string, payload: string) {
  const stmt = dbInstance.prepare("INSERT INTO history (topic, payload) VALUES (?, ?)");
  stmt.run(topic, payload);
}

export function getData(topic: string, limit: number = 100) {
  const stmt = dbInstance.prepare("SELECT * FROM history WHERE topic = ? ORDER BY timestamp DESC LIMIT ?");
  return stmt.all(topic, limit);
}

export function getFirstData(topic: string) {
  const stmt = dbInstance.prepare("SELECT * FROM history WHERE topic = ? ORDER BY timestamp ASC LIMIT 1");
  return stmt.get(topic);
}

export function getLastData(topic: string) {
  const stmt = dbInstance.prepare("SELECT * FROM history WHERE topic = ? ORDER BY timestamp DESC LIMIT 1");
  return stmt.get(topic);
}