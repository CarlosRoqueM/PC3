import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

export default function Create_Foto() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        foto: null
    })

    useEffect(() => {
        axios.get('http://localhost:8081/contactos/'+id)
        .then(res => {
            console.log(res)
            setValues({...values, 
                foto: res.data[0].foto});
        })
        .catch(err => console.log(err))
    }, [])

    const handleSubmit = async (event) => {

        const formData = new formData()

        formData.append('foto', values.foto)

        e.preventDefault();

        const response= await axios.post('http://localhost:8081/create_fot/'+id, formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            console.log(res);
            navigate('/')
        })
        console.log(response)
    }


  return (
    <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
      <div className='w-75 bg-secondary rounded p-4'>
            <form onSubmit={handleSubmit}>
                <h2>Agregar Foto para el Contacto</h2>
                <div className='mb-2'>
                <label htmlFor="">Foto</label>
                <input id="foto" type="file" placeholder='Ingresa tu foto' className='form-control'
                // inicialmente "onChange={e => setValues({...values, foto: e.target.value})}"
                onChange={e => setValues({...values, foto: e.target.files[0]})}/>
            </div>
            <button className='btn btn-success'>Guardar</button>
            </form>
        </div>
    </div>
  )
}
