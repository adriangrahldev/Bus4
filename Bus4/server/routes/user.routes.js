const express = require("express");
const UserController = require("../controllers/user.controller");

const UserRouter = express.Router();

// Rutas para el usuario
UserRouter.post("/register", UserController.register);
UserRouter.post("/login", UserController.login);
UserRouter.post("/logout", UserController.logout);


module.exports = UserRouter;
