import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from './Calendar';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.css';

const EditarEvento = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const [Evento, setEvento] = useState([]);

    useEffect(() => {
        const url = `http://localhost/trello-tech-login/ApiEventos.php?id=${id}`;
        axios.get(url)
            .then((response) => {
                const infoEvento = response.data;
                setEvento(infoEvento);
            })
            .catch((error) => {
                console.error(error);
            });
        const timerID = setInterval(() => tick(), 1000);
        return function cleanup() {
            clearInterval(timerID);
        };
    }, [id]);

    const tick = () => {
        setDate(new Date());
    };

    const handleClick = () => {
        navigate('/');
    };

    const handleClick01 = () => {
        navigate('/Eventos');
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita el envío por defecto del formulario

        // Obtiene los valores actualizados del formulario
        const titulo = event.target.elements[0].value;
        const descripcion = event.target.elements[1].value;

        // Realiza la solicitud PUT para actualizar el evento en el servidor
        const url = `http://localhost/trello-tech-login/ApiEventos.php?id=${id}`;
        axios
            .put(url, {
                id: id,
                titulo: titulo,
                descripcion: descripcion,
                fecha: Evento[0].fecha, // Asegúrate de enviar la fecha actual sin cambios
            })
            .then((response) => {
                // Maneja la respuesta del servidor
                console.log(response.data); 
                window.location.reload();// Puedes mostrar una notificación de éxito o redirigir al usuario a otra página
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
        <>
            <div className='redes'>
                <div className='reloj'>
                    <p>{date.toLocaleTimeString()}</p>
                    <p>{date.toLocaleDateString()}</p>
                </div>
                <button className='btn-cerrar-sesion' onClick={handleClick01}>Atras</button>
                <button className='btn-cerrar-sesion' onClick={handleClick}><BiLogOut /> Cerrar sesion</button>
            </div>
            <div className='container-eventos'>
                <div className='l1'>
                    <p className='titulo-proyecto'>Editar evento: {Evento[0] && Evento[0].titulo}</p>
                    <form className='form-evento' onSubmit={handleSubmit}>
                        <input type='text' className='form-control' defaultValue={Evento[0] && Evento[0].titulo} />
                        <input type='text' className='form-control' defaultValue={Evento[0] && Evento[0].descripcion} />
                        <button type='submit'>Guardar cambios</button>
                    </form>
                </div>
                <div className='l2'>
                    <Calendar />
                </div>
            </div>
            <Footer />
        </>

    );
}

export default EditarEvento