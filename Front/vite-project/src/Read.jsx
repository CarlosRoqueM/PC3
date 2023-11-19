import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Read() {
    const {id} = useParams();
    const [contactos, setContactos] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/read/'+id)
        .then(res => {
            console.log(res)
            setContactos(res.data[0]);
        })
        .catch(err => console.log(err))
    }, [])
  return (
    <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
      <div className='w-75 bg-secondary rounded p-4'>
        <form>
            <div className='p-2 '>
                <h2 className="text-dark">Detalle del Contacto</h2>
                <h3 className="text-white">ID</h3>
                <h4>{contactos.id}</h4>
                <h3 className="text-white">Nombre</h3>
                <h4>{contactos.nombre}</h4>
                <h3 className="text-white">Apellidos</h3>
                <h4>{contactos.apellidos}</h4>
                <h3 className="text-white">Correo</h3>
                <h4>{contactos.correo}</h4>
                <h3 className="text-white">Fecha de nacimiento</h3>
                <h4>{new Date(contactos.fecha_nac).toLocaleDateString()}</h4>
                <h3 className="text-white">Foto</h3>
                <h4>{contactos.foto}</h4>
            </div>
            <Link to="/" className='btn btn-primary me-2'>Regresar</Link>
            <Link to={`/edit/${contactos.id}`} className='btn btn-info'>Editar</Link>
            <p></p>
            <Link to={`/create_foto/${contactos.id}`} className='btn btn-dark text-white'>Agregar Foto</Link>
        </form>
      </div>
    </div>
  )
}
