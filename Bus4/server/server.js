const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8000;

// Configuración de CORS
const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, PATCH, DELETE",
};
app.use(cors(corsOptions));

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexión a la base de datos
require("./config/mongoose.config");

// Rutas
const UserRouter = require("./routes/user.routes");
app.use("/api/auth", UserRouter);
const busRoutes = require('./routes/bus.routes');
app.use('/api/bus', busRoutes);
const reservaRoutes = require('./routes/reserva.routes');
app.use('/api/reservas', reservaRoutes);


// Inicio del servidor
app.listen(PORT, () => console.log(`Servidor en funcionamiento en el puerto: ${PORT}`));
