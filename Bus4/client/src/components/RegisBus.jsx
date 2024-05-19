import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function RegisBus() {
  const [formData, setFormData] = useState({
    empresa: '',
    bus: '',
    salida: '',
    destino: '',
    fechaSalida: new Date(),
    horaSalida: '',
    capacidadBus: '',
    precioBoleto: ''
  });

  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState({
    empresas: [],
    salidas: [],
    destinos: []
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const responseDatos = await axios.get('http://localhost:8000/api/bus/');
        const uniqueEmpresas = [...new Set(responseDatos.data.map(bus => bus.empresa))];
        const uniqueSalidas = [...new Set(responseDatos.data.map(bus => bus.salida))];
        const uniqueDestinos = [...new Set(responseDatos.data.map(bus => bus.destino))];
        
        setOptions({
          empresas: uniqueEmpresas,
          salidas: uniqueSalidas,
          destinos: uniqueDestinos
        });
      } catch (error) {
        console.error('Error al obtener opciones:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/bus/register', formData);
      setFormData({
        empresa: '',
        bus: '',
        salida: '',
        destino: '',
        fechaSalida: new Date(),
        horaSalida: '',
        capacidadBus: '',
        precioBoleto: ''
      });
      setErrors({});
      console.log('Autobús registrado correctamente');
    } catch (error) {
      console.error('Error al registrar el autobús:', error.response.data.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prevState => ({
      ...prevState,
      fechaSalida: date
    }));
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.empresa.trim()) {
      errors.empresa = 'Ingrese el nombre de la empresa';
    }
    if (!data.bus.trim()) {
      errors.bus = 'Ingrese el número de autobús';
    }
    if (!data.salida.trim()) {
      errors.salida = 'Ingrese el origen de salida';
    }
    if (!data.destino.trim()) {
      errors.destino = 'Ingrese el destino';
    }
    if (!data.horaSalida.trim()) {
      errors.horaSalida = 'Ingrese la hora de salida';
    }
    if (!data.capacidadBus) {
      errors.capacidadBus = 'Ingrese la capacidad del bus';
    } else if (isNaN(data.capacidadBus)) {
      errors.capacidadBus = 'Ingrese un número válido';
    }
    if (!data.precioBoleto.trim()) {
      errors.precioBoleto = 'Ingrese el precio del boleto';
    } else if (isNaN(data.precioBoleto)) {
      errors.precioBoleto = 'Ingrese un número válido';
    }

    return errors;
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="empresa" className="form-label">Empresa:</label>
        <select
          className="form-select"
          id="empresa"
          name="empresa"
          value={formData.empresa}
          onChange={handleChange}
        >
          <option value="">Selecciona una empresa</option>
          {options.empresas.map((empresa) => (
            <option key={empresa} value={empresa}>
              {empresa}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="form-control"
          id="empresaManual"
          name="empresa"
          placeholder="O ingresa una empresa manualmente"
          onChange={handleChange}
        />
        {errors.empresa && <div className="text-danger">{errors.empresa}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="bus" className="form-label">Autobús:</label>
        <input
          type="text"
          className="form-control"
          id="bus"
          name="bus"
          value={formData.bus}
          onChange={handleChange}
        />
        {errors.bus && <div className="text-danger">{errors.bus}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="salida" className="form-label">Salida:</label>
        <select
          className="form-select"
          id="salida"
          name="salida"
          value={formData.salida}
          onChange={handleChange}
        >
          <option value="">Selecciona el Origen de Salida</option>
          {options.salidas.map((salida) => (
            <option key={salida} value={salida}>
              {salida}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="form-control"
          id="salidaManual"
          name="salida"
          placeholder="O ingresa un origen de salida manualmente"
          onChange={handleChange}
        />
        {errors.destino && <div className="text-danger">{errors.destino}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="destino" className="form-label">Destino:</label>
        <select
          className="form-select"
          id="destino"
          name="destino"
          value={formData.destino}
          onChange={handleChange}
        >
          <option value="">Selecciona un destino</option>
          {options.destinos.map((destino) => (
            <option key={destino} value={destino}>
              {destino}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="form-control"
          id="destinoManual"
          name="destino"
          placeholder="O ingresa un destino manualmente"
          onChange={handleChange}
        />
        {errors.destino && <div className="text-danger">{errors.destino}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="fechaSalida" className="form-label">Fecha de Salida:</label>
        <DatePicker
          className="form-control"
          selected={formData.fechaSalida}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="horaSalida" className="form-label">Hora de Salida:</label>
        <input
          type="time"
          className="form-control"
          id="horaSalida"
          name="horaSalida"
          value={formData.horaSalida}
          onChange={handleChange}
        />
        {errors.horaSalida && <div className="text-danger">{errors.horaSalida}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="capacidadBus" className="form-label">Capacidad del Bus:</label>
        <input
          type="number"
          className="form-control"
          id="capacidadBus"
          name="capacidadBus"
          value={formData.capacidadBus}
          onChange={handleChange}
        />
        {errors.capacidadBus && <div className="text-danger">{errors.capacidadBus}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="precioBoleto" className="form-label">Precio del Boleto:</label>
        <input
          type="text"
          className="form-control"
          id="precioBoleto"
          name="precioBoleto"
          value={formData.precioBoleto}
          onChange={handleChange}
        />
        {errors.precioBoleto && <div className="text-danger">{errors.precioBoleto}</div>}
      </div>
      <div >
        <button type="submit" className="btn btn-primary">Enviar</button>
      </div>
    </form>
  );
}

export default RegisBus;
