const Reserva = require('../models/reserva.model');


// Función para manejar el registro de reservas
exports.registerReserva = async (req, res) => {
    console.log(req.body);
    try {
        const newReserva = new Reserva(req.body);
        await newReserva.save();
        res.status(201).json({ message: 'Reserva registrada correctamente', saved: true});
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar la reserva' });
    }
}

// Función para obtener todas las reservas
exports.getAllReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find().populate('bus').populate('user');
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
}

// Función para obtener una reserva por ID
exports.getReservaById = async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id).populate('bus').populate('user');
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la reserva' });
    }
}

// Función para obtener las reservas de un usuario
exports.getReservasByUser = async (req, res) => {
    try {
        const reservas = await Reserva.find({ user: req.params.id }).populate('bus').populate('user');
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
}

// Función para actualizar una reserva por ID
exports.updateReserva = async (req, res) => {
    try {
        const updatedReserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.status(200).json(updatedReserva);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar la reserva' });
    }
}

// Función para eliminar una reserva por ID
exports.deleteReserva = async (req, res) => {
    try {
        const deletedReserva = await Reserva.findByIdAndDelete(req.params.id);
        if (!deletedReserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.status(200).json({ message: 'Reserva eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la reserva' });
    }
}

