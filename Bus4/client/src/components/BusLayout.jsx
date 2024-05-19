import axios from "axios";
import React, { useEffect, useState }  from "react";




export default function BusLayout() {
  const [datos, setDatos] = useState([])


const fetchData = async () => {

        const response = await axios.get("http://localhost:8000/api/bus/");
        const data = response.data;
        setDatos(data)
      }
 
useEffect (()=>{
  fetchData()
},[])
 return (
  <div>
  {datos ?(bus) => (

    <div key={bus._id}>
      <h2>Mi Dato</h2>
      <p>{bus.empresa}</p>
    </div>
  ) : (
    <p>Cargando...</p>
  )}
</div>
 )
};
