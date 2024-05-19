const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reserva.controller');

router.post('/register', reservaController.registerReserva);
router.get('/', reservaController.getAllReservas);
router.get('/:id', reservaController.getReservaById);
router.put('/:id', reservaController.updateReserva);
router.delete('/:id', reservaController.deleteReserva);
