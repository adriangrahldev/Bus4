import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const { useState, useContext, useEffect, useCallback } = require("react");
const { UserContext } = require("../context/UserContext");


const ReservationCreate = () => {
    const navigate = useNavigate();

    const { user } = useContext(UserContext); // Agregado para obtener el usuario del contexto
    const busId = useParams().busId;

    const [bus, setBus] = useState(null);
    const [reservas , setReservas] = useState([]); // Agregado para guardar las reservas del bus
    const [numAsiento, setNumAsiento] = useState(0);

    const fetchBus = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/bus/${busId}`);
            setBus(response.data.bus);
            setReservas(response.data.reservas);
        } catch (error) {
            console.error("Error al obtener bus:", error);
        }
    }, [busId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!numAsiento) {
            alert("Debes seleccionar un asiento.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/reservas/",{
                    bus: bus._id,
                    user: user._id,
                    numAsiento,
                }
            );
            if (response.data.saved) {
                fetchBus();
                setNumAsiento(0);
                alert("Reserva realizada con éxito.");
                navigate("/BusSearch")
            }
        } catch (error) {
            console.error("Error al realizar la reserva:", error);
            alert("Error al realizar la reserva.");
        }
    };

    const isReserved = (numAsiento) => {
        return reservas.some((reserva) => reserva.numAsiento === numAsiento);
    }

    useEffect(() => {
        fetchBus();
    }, [fetchBus])

    return (
        <div className="container mt-4">
            <div>
            <h2><b>{user?.firstName} {user?.lastName}</b></h2>
                <h4>{bus?.empresa}</h4>
                <div id="itinerario">
                    <p><b>Salida:</b> {bus?.salida}</p>
                    <p><b>Destino:</b> {bus?.destino}</p>
                    <p><b>Hora de salida:</b> {bus?.horaSalida}</p>
                    <p><b>Precio:</b> {bus?.precioBoleto} Gs.</p>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                {/* bus.capacidadBus tiene el numero de hacientos, generar 1 boton para cada haciento */}

                <div className="row">
                    {[...Array(bus?.capacidadBus)].map((_, index) => (
                        <div key={index} className="col">
                            <button
                            disabled={isReserved(index + 1)}
                                type="button"
                                className={`btn btn-${numAsiento === index + 1 ? "primary" : "secondary"}`}
                                onClick={() => setNumAsiento(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </div>
                    ))}
                </div>
                
                <button type="submit" className="btn btn-primary mt-4">Reservar</button>
            </form>
        </div>
    );
}

export default ReservationCreate;