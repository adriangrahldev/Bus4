const mongoose = require("mongoose");

const nombre_db = "Bus"; // Nombre de la base de datos

// Establecer conexión con la base de datos
mongoose.connect(`mongodb://localhost/${nombre_db}`)
    .then(() => console.log(`Se estableció una conexión con la base de datos ${nombre_db}`)) // Éxito en la conexión
    .catch(err => console.log(`Algo salió mal al conectar con la base de datos ${nombre_db}`, err)); // Error en la conexión
