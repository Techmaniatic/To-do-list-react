import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { useNavigate, Link } from 'react-router-dom';
import FormularioNuevoProyecto from './FormularioNuevoProyecto';
import axios from 'axios';
import { BiLogOut } from 'react-icons/bi';
import Calendar from './Calendar';


const Inicio = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [listProtectos, setListProyectos] = useState([]);
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {

    const url3 = 'http://localhost/trello-tech-login/ApiTareas.php';
    axios.get(url3)
      .then((response) => {
        const tareasProyecto = response.data;
        setListProyectos(tareasProyecto);
        console.log(tareasProyecto);
      })
      .catch((error) => {
        console.error(error);
      });


    const timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setDate(new Date());
  };

  const handleClick = () => {
    navigate('/');
  };

  const handleClick1 = () => {
    navigate('/Eventos');
  };

  const toggleComponent = () => {
    setShowComponent(!showComponent);
  };

  return (
    <>
      <div className='redes'>
        <div className='reloj'>
          <p>{date.toLocaleTimeString()}</p>
          <p>{date.toLocaleDateString()}</p>
        </div>
        <button className='btn-cerrar-sesion' onClick={handleClick}><BiLogOut /> Cerrar sesion</button>
      </div>
      <div className='container-general'>
        <div className='lado1'>
          <Calendar />
        </div>
        <div className='lado2'>
          <nav className='menu'>
            <ul>
              <li onClick={handleClick1}>Eventos</li>
              <li onClick={toggleComponent}>Crear proyecto</li>
              <li>Contacto</li>
            </ul>
          </nav>
          {showComponent && <FormularioNuevoProyecto />}
          <div className='container-proyectos'>
            {listProtectos.map((lt) => {
              const estiloProyecto = {
                backgroundColor: lt.codigo_color
              };
              return (
                <Link to={`/Proyecto/${lt.id}`} key={lt.id}>
                  <div className='cont-proyecto' style={estiloProyecto}>
                    <p className='fech_tarea'>{lt.nombre_proyecto}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Inicio