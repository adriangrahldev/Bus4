const express = require('express');
const router = express.Router();
const busController = require('../controllers/bus.controller');

// Ruta para el registro de autobuses
router.post('/register', busController.registerBus);

// Ruta para obtener todos los autobuses
router.get('/', busController.getAllBuses);

// Ruta para obtener un autobús por ID
router.get('/:id', busController.getBusById);

// Ruta para actualizar un autobús por ID
router.put('/:id', busController.updateBus);

// Ruta para eliminar un autobús por ID
router.delete('/:id', busController.deleteBus);

module.exports = router;
