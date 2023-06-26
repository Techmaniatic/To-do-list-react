import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FcNext } from 'react-icons/fc';
import { FcPrevious } from 'react-icons/fc';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const renderCalendar = () => {
    // Obtener el mes y año actual
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    // Obtener el primer y último día del mes
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Array de los días del mes
    const days = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push(
        <div
          key={i}
          onClick={() => handleDateClick(date)}
          className={isSelected(date) ? 'selected' : 'day'}
        >
          {i}
          {isSelected(date) && (
            <div className='event'>
              <input
                type="text"
                placeholder="Titulo"
                className='form-control'
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
              <textarea
                placeholder="Descripcion evento"
                className='form-control'
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
              <button onClick={() => addEvent(date)} className='btn-iniciar-sesion'>Añadir Evento</button>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const isSelected = (date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const addEvent = (date) => {
    // Crear objeto de evento con los datos del formulario
    const event = {
      titulo: eventTitle,
      descripcion: eventDescription,
      fecha: date.toISOString() // Convertir fecha a formato ISO para almacenamiento
    };
    // Enviar evento a tu API de PHP y MySQL para almacenarlo en la base de datos
    fetch('http://localhost/trello-tech-login/ApiEventos.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })
      .then(response => response.json())
      .then(data => {
        // Limpiar los campos del formulario después de agregar el evento
        setEventTitle('');
        setEventDescription('');
        window.location.reload();
        // Realizar cualquier acción adicional necesaria, como actualizar la lista de eventos en el calendario
      })
      .catch(error => {
        console.error('Error al agregar el evento:', error);
      });
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
            className='btn-next-prev'>
          <FcPrevious/>
        </button>
        <h3>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
            className='btn-next-prev'>
          <FcNext/>
        </button>
      </div>
      <div className="days">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
