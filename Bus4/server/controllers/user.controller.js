const { UserModel } = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

module.exports = {
    register: (req, res) => {
        const user = new UserModel(req.body);
        console.log("register", user);
        user
            .save()
            .then(() => {
                res.json({ msg: "User registered successfully!", user: user });
            })
            .catch(err => res.status(400).json({ error: err.message }));
    },
    logout: (req, res) => {
        res.clearCookie("usertoken");
        res.status(200).json({
            message: "You have successfully logged out of our system",
        });
    },
    login: (req, res) => {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }
    
        UserModel.findOne({ email })
            .then(user => {
                if (!user) {
                    return res.status(401).json({ msg: "Invalid email or password" });
                }
    
                bcrypt.compare(password, user.password)
                    .then(passwordIsValid => {
                        if (!passwordIsValid) {
                            return res.status(401).json({ msg: "Invalid email or password" });
                        }
    
                        const userInfo = {
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            role: user.roles[0], // Obtener el primer rol del usuario
                        };
    
                        const newJWT = jwt.sign(userInfo, secret);
                        res
                            .status(200)
                            .cookie("usertoken", newJWT, {
                                httpOnly: true,
                                expires: new Date(Date.now() + 900000000),
                            })
                            .json({ msg: "Login successful!", user: userInfo, newJWT });
    
                        console.log("Login successful!"); // Agregado para depuración
                    })
                    .catch(err => {
                        console.log("Error in bcrypt compare:", err); // Agregado para depuración
                        res.status(500).json({ msg: "Internal server error", error: err })
                    });
            })
            .catch(err => {
                console.log("Error in UserModel findOne:", err); // Agregado para depuración
                res.status(500).json({ msg: "Internal server error", error: err })
            });
    }
};
