const Bus = require('../models/bus.model');
const Reserva = require('../models/reserva.model');

// Función para manejar el registro de autobuses
exports.registerBus = async (req, res) => {
  try {
    const newBus = new Bus(req.body);
    await newBus.save();
    res.status(201).json({ message: 'Autobús registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el autobús' });
  }
};

// Función para obtener todos los autobuses
exports.getAllBuses = async (req, res) => {
  try {
    // get buses with the number of reservations
    const buses = await Bus.aggregate([
      {
        $lookup: {
          from: 'reservas',
          localField: '_id',
          foreignField: 'bus',
          as: 'reservas',
        },
      },
      {
        $addFields: {
          numReservas: { $size: '$reservas' },
        },
      },
    ]);
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los autobuses' });
  }
};

// Función para obtener un autobús por ID
exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    const reservas = await Reserva.find({ bus: req.params.id });
    if (!bus) {
      return res.status(404).json({ message: 'Autobús no encontrado' });
    }
    res.status(200).json({bus, reservas});
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el autobús' });
  }
};

// Función para actualizar un autobús por ID
exports.updateBus = async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBus) {
      return res.status(404).json({ message: 'Autobús no encontrado' });
    }
    res.status(200).json(updatedBus);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el autobús' });
  }
};

// Función para eliminar un autobús por ID
exports.deleteBus = async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params.id);
    if (!deletedBus) {
      return res.status(404).json({ message: 'Autobús no encontrado' });
    }
    res.status(200).json({ message: 'Autobús eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el autobús' });
  }
};
