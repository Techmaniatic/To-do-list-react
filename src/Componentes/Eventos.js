import React, { useState, useEffect } from 'react';
import Redes from './Redes'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { FcNext } from 'react-icons/fc';
import classNames from 'classnames';
import { FcPrevious } from 'react-icons/fc';

const Eventos = () => {
    const navigate = useNavigate();
    const [listEventos, setListEventos] = useState([]);

    useEffect(() => {

        const url = 'https://to-do.techmaniatic.com/trello-tech-login/ApiEventos.php';
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
        const url1 = `https://to-do.techmaniatic.com/trello-tech-login/ApiEventos.php?id=${id}`;
        axios.delete(url1)
            .then((response) => {
                console.log("Evento eliminada: " + response.data);
                navigate(0)
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

    /**********************************************************/

    const currentDate = new Date();
    const mesActual = currentDate.getMonth();
    console.log(mesActual);

    const currentDate1 = new Date();
    const añoActual = currentDate1.getFullYear();
    console.log(añoActual);

    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(mesActual);
    const [selectedYear, setSelectedYear] = useState(añoActual);
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',];

    const MesSiguiente = () => {
        setSelectedMonth(selectedMonth + 1)
    }

    const MesAnterior = () => {
        setSelectedMonth(selectedMonth - 1)
    }

    const generateCalendarDates = () => {
        const totalDays = new Date(selectedYear, selectedMonth + 1, 0).getDate(); // Número total de días en el mes seleccionado
        const firstDayIndex = new Date(selectedYear, selectedMonth, 1).getDay(); // Índice del primer día del mes (0-6)

        const calendarDates = [];
        let day = 1;

        for (let i = 0; i < 6; i++) {
            const week = [];

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayIndex) {
                    week.push(null); // Celdas vacías antes del primer día
                } else if (day > totalDays) {
                    week.push(null); // Celdas vacías después del último día
                } else {
                    week.push(day); // Día válido del mes
                    day++;
                }
            }
            calendarDates.push(week);
        }

        return calendarDates;
    };

    const toggleComponent = (day) => {
        setSelectedDay(day);

    };

    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const fecha = selectedDay + " " + (selectedMonth + 1) + " " + selectedYear;
    console.log(fecha);

    const addEvent = () => {
        // Crear objeto de evento con los datos del formulario
        const event = {
            titulo: eventTitle,
            descripcion: eventDescription,
            fecha: fecha // Convertir fecha a formato ISO para almacenamiento
        };
        // Enviar evento a tu API de PHP y MySQL para almacenarlo en la base de datos
        fetch('https://to-do.techmaniatic.com/trello-tech-login/ApiEventos.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
            .then(response => response.json())
            .then(data => {
                setEventTitle('');
                setEventDescription('');
                navigate(0)
            })
            .catch(error => {
                console.error('Error al agregar el evento:', error);
            });
    };


    return (
        <>
            <Redes />
            <div className='container-eventos'>
                <div className='l1'>
                    <div className='form-evento'>
                        <p>(Dar click en el dia para seleccionar la fecha de evento a ingresar)</p>
                        <p>Nuevo evento para el dia: Fecha seleccionada: {selectedDay}/{selectedMonth + 1}/{selectedYear}</p>
                    </div>
                    <div className='form-evento'>
                        <input
                            type='text'
                            placeholder='Titulo'
                            className='form-control'
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)} />
                        <input type='text'
                            placeholder='Descripcion'
                            className='form-control'
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)} />
                        <button onClick={() => addEvent()}>Guardar evento</button>
                    </div>
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
                    <div className='bloque1'>
                        <button className='btn-next-prev' onClick={MesAnterior}>
                            <FcPrevious className='icon' />
                        </button>
                        <p className='titulo2'>Mes: {monthNames[selectedMonth]} Año: {selectedYear}</p>
                        <button className='btn-next-prev' onClick={MesSiguiente}>
                            <FcNext className='icon' />
                        </button>
                    </div>

                    <table className='Table-calendario'>
                        <thead>
                            <tr>
                                {daysOfWeek.map((day) => (
                                    <th key={day}>{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {generateCalendarDates().map((week, index) => (
                                <tr key={index}>
                                    {week.map((day, index) => {
                                        const isCurrentDay = day === currentDate.getDate(); // Compara con el día actual (getDate())
                                        const cellClass = classNames({
                                            'current-day': isCurrentDay
                                        });

                                        return (
                                            <td key={index}
                                                className={cellClass}
                                                onClick={() => toggleComponent(day)}><p>{day}</p></td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Eventos