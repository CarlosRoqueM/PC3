import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';


export default function Update() {

    const {id} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8081/read/'+id)
        .then(res => {
            console.log(res)
            setValues({...values, nombre: res.data[0].nombre, 
                apellidos: res.data[0].apellidos, 
                correo: res.data[0].correo, 
                fecha_nac: res.data[0].fecha_nac, 
                foto: res.data[0].foto});
        })
        .catch(err => console.log(err))
    }, [])

    const [values, setValues] = useState({
        nombre: '',
        apellidos: '',
        correo:'',
        fecha_nac: '',
        foto: ''
    })

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/update/'+id, values)
        .then(res => {
            console.log(res)
            navigate('/')
        }).catch(err => console.log(err));
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-75 bg-white rounded p-4'>
        <form onSubmit={handleUpdate}>
            <h2>Actualizar Contacto</h2>
            <div className='mb-2'>
                <label htmlFor="">Nombre</label>
                <input type="text" placeholder='Ingresa tu numbre' className='form-control' value={values.nombre}
                onChange={e => setValues({...values, nombre: e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Apellido</label>
                <input type="text" placeholder='Ingresa tu apellido' className='form-control' value={values.apellidos}
                onChange={e => setValues({...values, apellidos: e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">correo</label>
                <input type="email" placeholder='Ingresa tu correo' className='form-control' value={values.correo}
                onChange={e => setValues({...values, correo: e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Fecha de Nacimiento</label>
                <input type="date" placeholder='Ingresa tu fecha de nacimiento' className='form-control' value={values.fecha_nac}
                onChange={e => setValues({...values, fecha_nac: e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Foto</label>
                <input type="" placeholder='Ingresa tu foto' className='form-control' value={values.foto}
                onChange={e => setValues({...values, foto: e.target.value})}/>
            </div>
            <button className='btn btn-success'>Actualizar</button>
        </form>
      </div>
    </div>
  )
}
