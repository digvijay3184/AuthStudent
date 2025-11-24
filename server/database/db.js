const Database = require('better-sqlite3');
const db = new Database('./database.sqlite');

db.exec(`
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT
    )`
);

module.exports = db ;