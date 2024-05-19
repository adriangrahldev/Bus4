const mongoose = require("mongoose");



const ReservaModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true
    },
    fechaReserva: {
        type: Date,
        required: true,
        default: Date.now
    },
    numAsiento: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const Reserva = mongoose.model('Reserva', ReservaModel);

module.exports = Reserva;