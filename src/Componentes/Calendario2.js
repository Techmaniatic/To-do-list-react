import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FcNext } from 'react-icons/fc';
import classNames from 'classnames';
import { FcPrevious } from 'react-icons/fc';

const Calendario2 = () => {


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

  return (
    <>
      <div className='bloque1'>
        <button className='btn-next-prev' onClick={MesAnterior}>
          <FcPrevious className='icon' />
        </button>
        <p className='titulo02'>Mes: {monthNames[selectedMonth]} Año: {selectedYear}</p>
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
    </>
  )
}

export default Calendario2