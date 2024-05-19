


const ReservaModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
        required: true
    },
    fechaReserva: {
        type: Date,
        required: true
    },
    numAsiento: {
        type: Number,
        required: true
    },
}, { timestamps: true });