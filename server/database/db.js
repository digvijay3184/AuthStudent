const Database = require('better-sqlite3');
const path = require("path");
const db = new Database(path.join(__dirname, "database.sqlite"));


db.exec(`
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT default 'student'
    )`
);

module.exports = db ;