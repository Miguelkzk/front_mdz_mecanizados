import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction'; // Para habilitar la interacción (click en eventos y fechas)
import "../styles/calendar.css";
import EventModal from './EventModal';
import { CalendarService } from '../service/calendar';
import EventForm from './EventForm';

const MyCalendar1 = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [titleModal, setTitleModal] = useState('');

  const fetchEvents = async () => {
    const data = await CalendarService.getEvents();
    const formattedEvents = data.map((event) => {

      const startDate = event.start ? event.start.split('T')[0] : null;
      const endDate = event.end ? event.end.split('T')[0] : null;

      return {
        title: event.title || 'Sin título',
        start: startDate,
        end: endDate,
        description: event.description || '',
        id: event.id,
        allDay: event.all_day ?? true,
      };
    });
    setEvents(formattedEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

//info.dateStr
  const handleDateClick = (info) => {
   setModalData({ start: info.dateStr });
   setTitleModal('Nuevo Evento');
   setShowForm(true);
  };

  const handleEventClick = (info) => {
    // Mostrar un modal con la información del evento al hacer clic
    setModalData(info.event);
    setShowModal(true);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, multiMonthPlugin, interactionPlugin]}
        initialView="multiMonthYear"
        events={events}
        locale="es"
        firstDay={1} // Configurar la semana para que comience el lunes
        dateClick={handleDateClick} // Hacer clic en una fecha
        eventClick={handleEventClick} // Hacer clic en un evento
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
        height="auto"
      />
      <EventModal
        showModal={showModal}
        handleCloseModal={() => setShowModal(false)}
        modalData={modalData}
      />

      <EventForm
        show={showForm}
        handleClose={() => setShowForm(false)}
        data={modalData}
        isEdit={false}
        title="Nuevo Evento"
      />
    </>

  );
};

export default MyCalendar1;
