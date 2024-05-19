import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

import axios from "axios";

const MisReservas = () => {

    const {user } = useContext(UserContext);
    const [reservas, setReservas] = useState([]);

    const fetchReservas = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/reservas/usuario/${user._id}`);
            console.log(response.data);
            setReservas(response.data);
        } catch (error) {
            console.error("Error al obtener la reserva:", error);
        }
    }, [user]);


    const handleDeleteReserva = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/reservas/${id}`);
            if (response.status === 200) {
                fetchReservas();
                alert("Reserva eliminada con éxito.");
            }
        } catch (error) {
            console.error("Error al eliminar la reserva:", error);
            alert("Error al eliminar la reserva.");
        }
    }

useEffect(() => {
    fetchReservas();
}, [fetchReservas]);



return (
    <div className="container py-4">
        <h2>Mis Reservas</h2>
        {reservas.length === 0 && <p>No tienes reservas</p>}
        {reservas?.map((reserva) => (
            <div key={reserva._id} className="card card-default my-2 mx-2 p-2 relative">
                <button className="btn btn-sm btn-outline-danger" style={{position: 'absolute', right: 10, top: 10}} onClick={(e) => {handleDeleteReserva(reserva._id)}}>Eliminar</button>
                <h3>{reserva.bus.empresa}</h3>
                <p><b>Fecha de reserva:</b> {new Date(reserva.createdAt).toLocaleDateString()}</p>
                <p><b>Salida:</b> {reserva.bus.salida}</p>
                <p><b>Destino:</b> {reserva.bus.destino}</p>
                <p><b>Fecha:</b> {new Date(reserva.bus.fechaSalida).toLocaleDateString()}</p>
                <p><b>Hora:</b> {reserva.bus.horaSalida}</p>
                <p><b>Asiento:</b> {reserva.numAsiento}</p>
                

            </div>
        ))}
    </div>
)

}
export default MisReservas;