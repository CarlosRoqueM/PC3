import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Create() {

    const [values, setValues] = useState({
        nombre: '',
        apellidos: '',
        correo:'',
        fecha_nac:'',
        foto:''
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/contactos', values)
        .then(res => {
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-75 bg-white rounded p-4'>
        <form onSubmit={handleSubmit}>
            <h2>Agregar Contacto</h2>
            <div className='mb-2'>
                <label htmlFor="">Nombre</label>
                <input type="text" placeholder='Ingresa tu numbre' className='form-control'
                onChange={e => setValues({...values, nombre: e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Apellido</label>
                <input type="text" placeholder='Ingresa tu apellido' className='form-control'
                onChange={e => setValues({...values, apellidos: e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">correo</label>
                <input type="email" placeholder='Ingresa tu correo' className='form-control'
                onChange={e => setValues({...values, correo: e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Fecha de Nacimiento</label>
                <input type="date" placeholder='Ingresa tu fecha de nacimiento' className='form-control'
                onChange={e => setValues({...values, fecha_nac: e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Foto</label>
                <input type="file" placeholder='Ingresa tu foto' className='form-control'
                onChange={e => setValues({...values, foto: e.target.value})}/>
            </div>
            <button className='btn btn-success'>Ingresar</button>
        </form>
      </div>
    </div>
  )
}

export default Create
