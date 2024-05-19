import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import BusList from "./BusList";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Container = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

export default function BusSearch({ searchState, setSearchState }) {
  const hoy = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Agregado para obtener el usuario del contexto

  const [filteredBus, setFilteredBus] = useState(null);
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState({
    empresas: [],
    salidas: [],
    destinos: [],
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/bus/");
        const data = response.data;

        const uniqueSalidas = [...new Set(data.map((bus) => bus.salida))];
        const uniqueDestinos = [...new Set(data.map((bus) => bus.destino))];

        setOptions({
          empresas: data.map((bus) => bus.empresa),
          salidas: uniqueSalidas,
          destinos: uniqueDestinos,
        });
      } catch (error) {
        console.error("Error al obtener opciones:", error);
        setErrors({ options: "Error al obtener opciones" });
      }
    };

    fetchOptions();
  }, []);
  const validateSearch = () => {
    let formValid = true;
    const newErrors = {};

    if (!searchState.from || !searchState.to) {
      newErrors.selection = "Debes seleccionar la salida y el destino.";
      formValid = false;
    }

    if (!searchState.date || searchState.date < hoy) {
      newErrors.date = "Debes seleccionar una fecha válida.";
      formValid = false;
    }

    setErrors(newErrors);
    return formValid;
  };

  const handleSearch = async () => {
    if (!validateSearch()) return;

    try {
      const response = await axios.get(`http://localhost:8000/api/bus/`);
      console.log("Datos recibidos:", response.data); // Agregado para ver los datos recibidos

      const filteredData = response.data.filter(
        (data) =>
          data.salida === searchState.from &&
          data.destino === searchState.to &&
          data.fechaSalida.includes(searchState.date)
      );
      console.log("Datos filtrados:", filteredData); // Agregado para ver los datos filtrados

      setFilteredBus(filteredData);
    } catch (error) {
      console.error("Error al buscar autobuses:", error);
    }
  };

  return (
    <Container>
      {errors.selection && <div>{errors.selection}</div>}
      {errors.date && <div>{errors.date}</div>}
      {errors.options && <div>Error al cargar opciones</div>}
      <h2 className="mb-3">Buscar Autobuses</h2>
      <div className="d-flex flex-column align-items-center">
        <Form.Select
          className="mb-3 width-300"
          value={searchState.from}
          onChange={(e) =>
            setSearchState((prevState) => ({
              ...prevState,
              from: e.target.value,
            }))
          }
        >
          <option value="">Seleccionar Salida</option>
          {options.salidas.map((salida) => (
            <option key={salida} value={salida}>
              {salida}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          className="mb-3 width-300"
          value={searchState.to}
          onChange={(e) =>
            setSearchState((prevState) => ({
              ...prevState,
              to: e.target.value,
            }))
          }
        >
          <option value="">Seleccionar Destino</option>
          {options.destinos.map((destino) => (
            <option key={destino} value={destino}>
              {destino}
            </option>
          ))}
        </Form.Select>
        <input
          className="form-control mb-3 width-300"
          type="date"
          min={hoy}
          value={searchState.date}
          onChange={(e) =>
            setSearchState((prevState) => ({
              ...prevState,
              date: e.target.value,
            }))
          }
        />
      </div>
      <div className="m">
        <Button variant="primary" className="me-3" onClick={handleSearch}>
          Buscar
        </Button>
        {user && user.role === "admin" && (
          <Button
            variant="primary"
            className="ms-3 px-3"
            onClick={() => navigate("/RegisBus")}
          >
            Crear
          </Button>
        )}
      </div>
      {filteredBus && <BusList filteredBuses={filteredBus} />}
    </Container>
  );
}
