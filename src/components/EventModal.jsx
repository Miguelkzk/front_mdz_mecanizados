import { Modal } from "react-bootstrap";

function EventModal({ showModal, handleCloseModal, modalData }) {
  // Formato de fecha en dd/mm/yyyy
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const daylessDate = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    return newDate;
  }
  var end;
  var endDayless;

  const start = formatDate(modalData.start);
  if (modalData.end !== null) {
    end = daylessDate(modalData.end);
    endDayless = formatDate(end);
  } else {
    endDayless = start;
  }

  const description = modalData.extendedProps?.description || "Sin descripción";


  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{modalData.title || "Evento"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Fecha de inicio:</strong> {start}</p>
        <p><strong>Fecha de fin:</strong> {endDayless}</p>
        <p><strong>Descripción:</strong> {description}</p>
      </Modal.Body>
      <Modal.Footer style={{justifyContent: 'center'}}>
          <button className="btn btn-secondary" onClick={handleCloseModal}>Editar</button>
          <button className="btn btn-danger" onClick={handleCloseModal}>Borrar</button>
      </Modal.Footer>
    </Modal>
  );
}

export default EventModal;
