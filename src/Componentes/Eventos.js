import React, { useState, useEffect } from 'react';
import Redes from './Redes'
import Footer from './Footer'
import Calendar from './Calendar';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate} from 'react-router-dom';

const Eventos = () => {
    const navigate = useNavigate();
    const [listEventos, setListEventos] = useState([]);

    useEffect(() => {

        const url = 'http://localhost/trello-tech-login/ApiEventos.php';
        axios.get(url)
            .then((response) => {
                const infoEvento = response.data;
                setListEventos(infoEvento);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    const handleEliminarEvento = (id) => {
        const url1 = `http://localhost/trello-tech-login/ApiEventos.php?id=${id}`;
        axios.delete(url1)
            .then((response) => {
                console.log("Evento eliminada: " + response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
                // Realizar las acciones necesarias en caso de error
            });
    };

    /**********************************************************/

    const [showComponent, setShowComponent] = useState(false);
    
    const handleShowComponent = (id) => {
        navigate(`/Evento/${id}`);
    };

    return (
        <>
            <Redes />
            <div className='container-eventos'>
                <div className='l1'>
                    <p className='titulo-proyecto'>Mis eventos</p>
                    <div className="table-responsive">

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Titulo</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listEventos.map((event) => (
                                    <tr key={event.id}>
                                        <th scope="row">{event.id}</th>
                                        <td>{event.titulo}</td>
                                        <td>{event.descripcion}</td>
                                        <td>{event.fecha}</td>
                                        <td className='acciones'>
                                            <button className='btn-cerrar-sesion'
                                                onClick={() => handleShowComponent(event.id)}>Editar</button>
                                            <button className='btn_tarea_eliminada'
                                                onClick={() => handleEliminarEvento(event.id)}>
                                                <AiFillDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                    </div>
                </div>
                <div className='l2'>
                    <Calendar />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Eventos