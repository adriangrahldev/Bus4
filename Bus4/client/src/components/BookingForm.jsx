import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { locations } from '../utils'

export default function BookingForm({ searchState, selectedSeats, setSearchState, setSelectedSeats  }) {

    const navigate = useNavigate()
    return (
        <div className='text-center'>
            <h5>{searchState.from} to {searchState.to}</h5>
            <h5>Fecha: {searchState.date} </h5>
            <br />
            <h5>Por favor complete los detalles a continuación </h5>
            {selectedSeats.map(data => (
            <div>       
                    <div className='my-3'>Asiento No: {data}</div>
                    <Form.Group className='d-flex justify-content-center'>
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control
                            className='ms-2 mb-3 width-300'
                            placeholder='Nombre' type='text' />
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-center'>
                        <Form.Label>Edad:</Form.Label>
                        <Form.Control
                            className='ms-2 mb-3 width-300'
                            placeholder='Edad' type='number' min="0" />
                    </Form.Group>
            </div>
        ))}
            <Button onClick={()=>{ alert('Su ticket reservado con éxito');
            navigate("/BusSearch"); setSearchState({
                from: locations[0],
                to: locations[2],
                date: '',
              })
             setSelectedSeats([])
        }} 
            variant='success'>
           Pagar ahora
            </Button>
        </div>
    )
}