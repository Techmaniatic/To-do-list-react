import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';

const ListaTareas = ({ proyectoId }) => {

    const [listTareaProyecto, setListTareaProyecto] = useState([]);

    useEffect(() => {
        const url = `http://localhost/trello-tech-login/ApiListaTareas.php`;
        axios
            .get(url)
            .then((response) => {
                const tareaslistProyecto = response.data;
                const tareasProyectoActual = tareaslistProyecto.filter(
                    (tarea) => tarea.id_proyecto === proyectoId
                );
                setListTareaProyecto(tareasProyectoActual);
                console.log(tareasProyectoActual);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [proyectoId]);

    const handleEliminarTarea = (id) => {
        const url4 = `http://localhost/trello-tech-login/ApiListaTareas.php?id=${id}`;
        axios.delete(url4)
            .then((response) => {
                console.log("Tarea eliminada: " + response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
                // Realizar las acciones necesarias en caso de error
            });
    };

    return (
        <div className='cont-lista-tarea-proyectos'>
            {listTareaProyecto.map((tarea) => (
                <div className='cont-tarea' key={tarea.id}>
                    <p className='fecha_tarea'>{tarea.fecha}</p>
                    <div className='containerTarea'>
                        <p>{tarea.tarea}</p>
                        <button className='btn-cerrar-sesion'>Tarea completada</button>
                        <button className='btn_tarea_eliminada'
                            onClick={() => handleEliminarTarea(tarea.id)}>
                            <AiFillDelete />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListaTareas