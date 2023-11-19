import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

function Home(){
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

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

    const seacher = (e) => {
        setSearch(e.target.value)
    }
    
    const results = !search ? data : data.filter((dato) => dato.apellidos.toLowerCase().includes(search.toLowerCase()));
    
    return(

    <div className='d-flex min-vh-100 bg-dark justify-content-center align-items-center'>
        <div className='w-75 bg-secondary rounded p-4'>
            <h2 className="mb-4">Lista de Contactos</h2>
            <p></p>
            <div>
                <input value={search} onChange={seacher}
                type="text" placeholder="Ingresar Apellido" className="form-control" />
            </div>
            <p></p>
            <div className="d-flex justify-content-end">
                <Link to="/create" className="btn btn-success">Crear +</Link>
            </div>
            <p></p>
            <div className="card-columns ">
                {results.map((contactos, index) => (
                    <div className="card bg-dark" key={index}>
                        
                        <div className="card-body">
                            <img src="https://img.freepik.com/foto-gratis/hombre-morena-sobre-fondo-blanco-aislado_1368-4406.jpg?w=826&t=st=1700430373~exp=1700430973~hmac=b600f2a9ae3cc78a6e6fd611d430f99e634b5085b3c2871e3458cd141c00f5d0" alt="" width="300"  height="300" />
                            <h2 className="card-title text-white">{contactos.nombre} {contactos.apellidos}</h2>
                            <div className="btn-group" role="group" aria-label="Opciones">
                                <Link to={`/read/${contactos.id}`} className="btn btn-info">Ver</Link>
                                <Link to={`/edit/${contactos.id}`} className="btn btn-primary mx-2">Editar</Link>
                                <button onClick={() => handleDelete(contactos.id)} className="btn btn-danger">Borrar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)}

export default Home