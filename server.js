const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = 'data.json';

// Leer datos
function readData() {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
}

// Guardar datos
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Obtener movimientos
app.get('/api/movimientos', (req, res) => {
    try {
        const data = readData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al leer datos' });
    }
});

// Agregar movimiento
app.post('/api/movimientos', (req, res) => {
    try {
        const { tipo, monto, descripcion } = req.body;

        if (!tipo || !monto) {
            throw new Error("Datos inválidos");
        }

        const data = readData();

        const nuevo = {
            id: Date.now(),
            tipo,
            monto,
            descripcion
        };

        data.push(nuevo);
        writeData(data);

        res.json(nuevo);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});