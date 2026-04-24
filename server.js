const express = require('express');
const path = require('path');
const { sequelize, Movimiento } = require('./models');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// =======================
// 📌 RUTAS API
// =======================

// Obtener todos los movimientos
app.get('/api/movimientos', async (req, res) => {
    try {
        const movimientos = await Movimiento.findAll({
            order: [['createdAt', 'ASC']]
        });
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos' });
    }
});

// Crear nuevo movimiento
app.post('/api/movimientos', async (req, res) => {
    try {
        const { tipo, monto, descripcion } = req.body;

        // Validación básica
        if (!tipo || !monto) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        const nuevo = await Movimiento.create({
            tipo,
            monto,
            descripcion
        });

        res.json(nuevo);
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar datos' });
    }
});

// =======================
// 🚀 INICIAR SERVIDOR
// =======================

const PORT = 3000;

sequelize.sync().then(() => {
    console.log('📦 Base de datos conectada');

    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
});