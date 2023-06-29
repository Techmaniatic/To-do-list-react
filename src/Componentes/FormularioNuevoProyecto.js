import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const FormularioNuevoProyecto = () => {

    const navigate = useNavigate();
    const [codigo_color, setCodigo_color] = useState('');
    const [nombre_proyecto, setNombre_proyecto] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://to-do.techmaniatic.com/trello-tech-login/ApiTareas.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ nombre_proyecto, codigo_color }) // Aquí se convierte el objeto JSON a una cadena
            });
      
          const data = await response.json();
        //   console.log(data)
      
          if (data[0] === 'success') {
                navigate(0)
          }
      
           } catch (error) {
            console.error(error);
          }
    
    }

    return (
        <div className='formulario-nuevo-proyecto'>
            <p className='title-nuevo-proyecto'>Nuevo proyecto</p>
            <form onSubmit={handleSubmit}>
                <input type='text' 
                    className='form-control' 
                    value={nombre_proyecto}
                    onChange={(e) =>  setNombre_proyecto(e.target.value)}/>
                <div className='grid-colores'>
                    <div key={'#8047DD-radio'} className="item-color">
                        <Form.Check
                            type="radio"
                            id={'#8047DD'}
                            name={'colorGroup'}
                            label={'#8047DD'}
                            value={'#8047DD'}
                            style={{ backgroundColor: '#8047DD' }}
                            checked={codigo_color === '#8047DD'}
                            onChange={(e) =>  setCodigo_color(e.target.value)}
                        />
                    </div>
                    <div key={'#00FFFF-radio'} className="item-color">
                        <Form.Check
                            type="radio"
                            id={'#00FFFF'}
                            name={'colorGroup'}
                            label={'#00FFFF'}
                            value={'#00FFFF'}
                            style={{ backgroundColor: '#00FFFF' }}
                            checked={codigo_color === '#00FFFF'}
                            onChange={(e) =>  setCodigo_color(e.target.value)}
                        />
                    </div>
                    <div key={'#24005A-radio'} className="item-color">
                        <Form.Check
                            type="radio"
                            id={'#24005A'}
                            name={'colorGroup'}
                            label={'#24005A'}
                            value={'#24005A'}
                            style={{ backgroundColor: '#24005A' }}
                            checked={codigo_color === '#24005A'}
                            onChange={(e) =>  setCodigo_color(e.target.value)}
                        />
                    </div>
                    <div key={'#AB92BF-radio'} className="item-color">
                        <Form.Check
                            type="radio"
                            id={'#AB92BF'}
                            name={'colorGroup'}
                            label={'#AB92BF'}
                            value={'#AB92BF'}
                            style={{ backgroundColor: '#AB92BF' }}
                            checked={codigo_color === '#AB92BF'}
                            onChange={(e) =>  setCodigo_color(e.target.value)}
                        />
                    </div>
                    <div key={'#EE7DDE-radio'} className="item-color">
                        <Form.Check
                            type="radio"
                            id={'#EE7DDE'}
                            name={'colorGroup'}
                            label={'#EE7DDE'}
                            value={'#EE7DDE'}
                            style={{ backgroundColor: '#EE7DDE' }}
                            checked={codigo_color === '#EE7DDE'}
                            onChange={(e) =>  setCodigo_color(e.target.value)}
                        />
                    </div>
                    <div key={'#C6C6C6-radio'} className="item-color">
                        <Form.Check
                            type="radio"
                            id={'#C6C6C6'}
                            name={'colorGroup'}
                            label={'#C6C6C6'}
                            value={'#C6C6C6'}
                            style={{ backgroundColor: '#C6C6C6' }}
                            checked={codigo_color === '#C6C6C6'}
                            onChange={(e) =>  setCodigo_color(e.target.value)}
                        />
                    </div>
                </div>
                <button className='btn-cerrar-sesion' type='submit'>Crear</button>
            </form>
        </div>
    )
}

export default FormularioNuevoProyecto