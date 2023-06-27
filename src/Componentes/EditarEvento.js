import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarEvento = ({ eventId }) => {
    const [listEventos, setListEventos] = useState([]);


        useEffect(() => {
            const url = `http://localhost/trello-tech-login/ApiEventos.php`;
            axios.get(url)
                .then((response) => {
                    const infoEvento = response.data;
                    const EventoActual = infoEvento.filter(
                        (tarea) => tarea.id ===  eventId
                    );
                    setListEventos(EventoActual);
                    console.log(EventoActual)
                })
                .catch((error) => {
                    console.error(error);
                });
        }, [eventId]);
   
    return (
        <div className='editarEvento'>
            <p>sss</p>
        </div>
    )
}

export default EditarEvento