import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validaciones
    if (!formData.firstName.trim()) {
      setError("Ingrese su nombre");
      return;
    }

    if (!formData.lastName.trim()) {
      setError("Ingrese su apellido");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Ingrese un correo electrónico válido");
      return;
    }

    if (!formData.password) {
      setError("Ingrese una contraseña");
      return;
    }

    if (formData.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Enviar los datos del usuario al backend
    axios
      .post("http://localhost:8000/api/auth/register", formData)
      .then((response) => {
        console.log("Datos del usuario registrados:", response.data);
        navigate("/"); // Redirigir a la página de inicio
      })
      .catch((error) => {
        console.error("Error al registrar el usuario:", error);
        setError("Error al registrar el usuario. Intente de nuevo.");
      });

    // Limpiar el formulario
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          Nombre:
        </label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Ingrese Nombre"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Apellido:
        </label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Ingrese Apellido"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Correo:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ejemplo@correo.com"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña:
        </label>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 8 caracteres"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirmar Contraseña:
        </label>
        <div className="input-group">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmar contraseña"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowConfirmPassword}
          >
            {showConfirmPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Crear Usuario
      </button>
    </form>
  );
};

export default Registro;
