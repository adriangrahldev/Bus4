const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  empresa: {
    type: String,
    required: true,
  },
  bus: {
    type: String,
    required: true,
  },
  salida: {
    type: String,
    required: true,
  },
  destino: {
    type: String,
    required: true,
  },
  fechaSalida: {
    type: Date,
    required: true,
  },
  horaSalida: {
    type: String,
    required: true,
  },
  capacidadBus: {
    type: Number,
    required: true,
  },
  precioBoleto: {
    type: Number,
    required: true,
  },
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
