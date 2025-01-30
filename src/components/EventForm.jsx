import { useEffect, useState } from "react";
import { Form, FormControl, Modal } from "react-bootstrap";
import { CalendarService } from "../service/calendar";

function EventForm({ show, handleClose, data, title, isEdit }) {
  const [errors, setErrors] = useState({});
  const [event, setEvent] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
  });

  // Función para formatear fecha en "YYYY-MM-DD"
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Función para sumar un día a una fecha
  const addOneDay = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return formatDate(date);
  };

  // Función para restar un día a una fecha
  const subtractOneDay = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() - 1);
    return formatDate(date);
  };

  const setModalData = (data) => {
    setEvent({
      title: data?.title || "",
      description: data?.description || "",
      start: data?.start ? data.start.split("T")[0] : "",
      end: data?.end ? subtractOneDay(data.end.split("T")[0]) : "",
    });
  };

  useEffect(() => {
    setModalData(data);
  }, [data]);

  const handleCloseModal = () => {
    setEvent({
      title: "",
      description: "",
      start: "",
      end: "",
    });
    setErrors({});
    handleClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEvent((prevEvent) => {
      let updatedEvent = { ...prevEvent, [name]: value };

      if (name === "start" && value) {
        updatedEvent.end = addOneDay(value);
      }

      return updatedEvent;
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!event.title) formErrors.title = "El título es requerido";
    if (!event.start) formErrors.start = "La fecha de inicio es requerida";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSave = async () => {
    if (event.end !== ""){
      event.end = addOneDay(event.end);
    }
    if (validateForm()) {
      if (isEdit) {
        await CalendarService.updateEvent(event, data.id);
        console.log(event);
      } else{
        await CalendarService.createEvent(event);
      }
      handleCloseModal();
    }
  };
  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mt-2">
            <Form.Label>Título</Form.Label>
            <FormControl
              type="text"
              placeholder="Ingrese el título del evento"
              name="title"
              value={event.title}
              onChange={handleInputChange}
              isInvalid={!!errors.title}
            />
            {errors.title && <Form.Text className="text-danger">{errors.title}</Form.Text>}
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Fecha de inicio</Form.Label>
            <Form.Control
              type="date"
              name="start"
              value={event.start}
              onChange={handleInputChange}
              isInvalid={!!errors.start}
            />
            {errors.start && <Form.Text className="text-danger">{errors.start}</Form.Text>}
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Fecha de fin</Form.Label>
            <Form.Control
              type="date"
              name="end"
              value={event.end}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Descripción</Form.Label>
            <FormControl
              type="text"
              placeholder="(opcional)"
              name="description"
              value={event.description}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "center" }}>
        <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
      </Modal.Footer>
    </Modal>
  );
}

export default EventForm;
