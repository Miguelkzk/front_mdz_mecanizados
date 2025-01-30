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
  const [isEdit, setIsEdit] = useState(false);

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
    setModalData({
      id: info.event.id,
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
      description: info.event.extendedProps?.description || "Sin descripción"
    });
    setShowModal(true);
  };

  const handleEdit = () => {
    setShowModal(false);
    setTitleModal('Editar Evento');
    setIsEdit(true);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setIsEdit(false);
    fetchEvents();
  };

  const handleCloseInfoModal = () => {
    setShowModal(false);
    fetchEvents();
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
        handleCloseModal={handleCloseInfoModal}
        modalData={modalData}
        handleEdit={handleEdit}
      />

      <EventForm
        show={showForm}
        handleClose={handleCloseForm}
        data={modalData}
        isEdit={isEdit}
        title={titleModal}
      />
    </>

  );
};

export default MyCalendar1;
