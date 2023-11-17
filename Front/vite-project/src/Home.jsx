import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

function Home(){
    const [data, setData] = useState([])
    useEffect(() =>{
        axios.get('http://localhost:8081/')    
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:8081/delete/'+id)
        .then(res => {
            location.reload();
        })
        .catch(err => console.log(err));
    }

  return(
    
    <div className='d-flex min-vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-75 bg-white rounded p-4'>
            <h2 className="mb-4">Lista de Contactos</h2>
            <div className="d-flex justify-content-end">
                <Link to = "/create" className="btn btn-success" >Crear +</Link>
            </div>
            <div className="table-responsive">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Correo</th>
                            <th>Fecha de nacimiento</th>
                            <th>Foto</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((contactos, index) => {
                            return <tr key={index}>
                                <td>{contactos.id}</td>
                                <td>{contactos.nombre}</td>
                                <td>{contactos.apellidos}</td>
                                <td>{contactos.correo}</td>
                                <td>{new Date(contactos.fecha_nac).toLocaleDateString()}</td>
                                <td>
                                    {contactos.foto}
                                </td>
                                <td className="text-center">
                                    <div className="btn-group" role="group" aria-label="Opciones">
                                        <Link to={`/read/${contactos.id}`} className="btn btn-sm btn-info">Ver</Link>
                                        <Link to={`/edit/${contactos.id}`}className="btn btn-sm btn-primary mx-2">Editar</Link>
                                        <button onClick={() => handleDelete(contactos.id)} className="btn btn-sm btn-danger">Borrar</button> 
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
)}

export default Home