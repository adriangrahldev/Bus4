import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validaciones
        if (!email) {
            setError('Ingrese su Correo');
            return;
        }

        if (!password) {
            setError('Ingrese su Contraseña');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });
            console.log('Datos del usuario:', response.data);
            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Guardar en localStorage
            // Redirigir al usuario a otra página después de un inicio de sesión exitoso
            navigate('/BusSearch');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error al iniciar sesión. Verifique sus credenciales.');
        }
    };
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <div className='d-flex align-items-center justify-content-between'> 
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <a href='#' onClick={() => navigate("/Registro")}>No estas registrado</a>
                </div>
            </Form>
        </div>
    );
};

export default Login;
