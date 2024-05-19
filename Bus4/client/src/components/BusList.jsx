// BusList.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const BusListContainer = styled.div`
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const BusItem = styled.div`
  background-color: white;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function BusList({ filteredBuses }) { // Cambiado de 'buses' a 'filteredBuses'
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    if (filteredBuses) { // Añadido para evitar una ejecución inicial innecesaria
      setBuses(filteredBuses);
    }
  }, [filteredBuses]);

  return (
    <BusListContainer>
      <h2>Buses Disponibles</h2>
      {buses.map((bus) => (
        <BusItem
          className="d-flex align-items-center justify-content-between"
          key={bus._id}
        >
          <div>
            <h3>{bus.bus}</h3>
            <p>
              <strong>Empresa: </strong>
              {bus.empresa}
            </p>
            <p>
              <strong>Partida: </strong>
              {bus.salida}
            </p>
            <p>
              <strong>Destino: </strong>
              {bus.destino}
            </p>
            <p>
              <strong>Hora de partida: </strong>
              {bus.horaSalida}
            </p>
            <p>
              <strong>Precio: </strong>
              {bus.precioBoleto} Gs.
            </p>
            <p>
              <strong>Capacidad: </strong>
              {bus.capacidadBus}
            </p>
          </div>
          <div>
            <div>
              <h3 style={{textDecoration: 'underline'}} >{bus.capacidadBus - bus.numReservas}</h3>
              <span>Lugares disponibles</span>
            </div>
          <Button className="mb-3" variant="success" onClick={() => navigate(`/reservas/crear/${bus._id}`)}>
          Reservar ahora
          </Button>
        </div>
        </BusItem>
      ))}
    </BusListContainer>
  );
}
