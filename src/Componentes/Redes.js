import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';
import { BiLogOut } from 'react-icons/bi';

const Redes = () => {
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
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
        navigate('/Inicio');
      };

      
  return (
    <div className='redes'>
        <div className='reloj'>
          <p>{date.toLocaleTimeString()}</p>
          <p>{date.toLocaleDateString()}</p>
        </div>
        <button className='btn-cerrar-sesion' onClick={handleClick1}><TiArrowBackOutline /> Atras</button>
        <button className='btn-cerrar-sesion' onClick={handleClick}><BiLogOut /> Cerrar sesion</button>
      </div>
  )
}

export default Redes