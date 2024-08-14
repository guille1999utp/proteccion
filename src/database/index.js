const fs = require("fs");

const DB_FILE = "fibonacci_db.json";

// Leer la base de datos desde el archivo JSON
function readDatabase() {
    if (fs.existsSync(DB_FILE)) {
        const data = fs.readFileSync(DB_FILE);
        return JSON.parse(data);
    }
    return [];
}

// Guardar la base de datos en el archivo JSON
function saveDatabase(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

module.exports = { readDatabase, saveDatabase };