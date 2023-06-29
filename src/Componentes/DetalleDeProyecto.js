import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from './Footer';
import Redes from './Redes';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListaTareas from './ListaTareas';
import Calendar from './Calendar';

const DetalleDeProyecto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Proyecto, setProyecto] = useState([]);


  useEffect(() => {
    setId_proyecto(id);

    const url3 = `https://to-do.techmaniatic.com/trello-tech-login/ApiTareas.php?id=${id}`;
    axios.get(url3)
      .then((response) => {
        const infoProyecto = response.data;
        setProyecto(infoProyecto);

      })
      .catch((error) => {
        console.error(error);
      });

  }, [id]);


  /***********************************************************************************************************/

  const [id_proyecto, setId_proyecto] = useState(id);
  const [tarea, setTarea] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [completada, setCompletada] = useState('incompleta');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://to-do.techmaniatic.com/trello-tech-login/ApiListaTareas.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_proyecto: id_proyecto, tarea, fecha, completada }) // Aquí se convierte el objeto JSON a una cadena
      });

      const data = await response.json();
      console.log(data);

      if (data[0] === 'success') {
        navigate(0)
      }

    } catch (error) {
      console.error(error);
    }

  }


  return (
    <>
      <Redes />
      <div className='container-general'>
        <div className='lado1'>
          <p className='titulo-proyecto'>Proyecto: {Proyecto[0] && Proyecto[0].nombre_proyecto}</p>
          <Link to={'/Eventos'} className='link-eventos'>
            Ver Eventos
          </Link>
          <Calendar />
        </div>
        <div className='lado2'>
          <p className='titulo-proyecto'>Lista de Tareas</p>
          <form className='form-tareas' onSubmit={handleSubmit}>
            <input type='text'
              className='form-control'
              value={tarea}
              onChange={(e) => setTarea(e.target.value)} />
            <button className='btn-cerrar-sesion' type='submit'>+</button>
          </form>
          <ListaTareas proyectoId={id} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DetalleDeProyecto