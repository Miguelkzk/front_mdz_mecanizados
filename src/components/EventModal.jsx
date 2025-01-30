import { Modal } from "react-bootstrap";
import InfoModal from "./infoModal";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { CalendarService } from "../service/calendar";


function EventModal({ showModal, handleCloseModal, modalData, handleEdit }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Función para formatear fecha correctamente
  const formatDate = (date) => {
    if (!date) return "N/A";

    // Si date es un string en formato "YYYY-MM-DD", lo convertimos sin cambiar la zona horaria
    const parts = date.split("-");
    if (parts.length === 3) {
      const adjustedDate = new Date(parts[0], parts[1] - 1, parts[2]); // Año, Mes (0-indexed), Día
      return adjustedDate.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }

    // Si no es una fecha en formato "YYYY-MM-DD", usamos el método normal
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return "Fecha inválida";

    return parsedDate.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Función para restar un día a una fecha
  const subtractOneDay = (date) => {
    if (!date) return "N/A";

    const parts = date.split("-");
    if (parts.length === 3) {
      const adjustedDate = new Date(parts[0], parts[1] - 1, parts[2]); // Año, Mes (0-indexed), Día
      adjustedDate.setDate(adjustedDate.getDate() - 1); // Restar un día
      return adjustedDate.toISOString().split("T")[0]; // Convertir a "YYYY-MM-DD"
    }

    return date;
  };

  const handleCloseConfirmModal = () => {
    setShowDeleteModal(false);
    handleCloseModal();
  }

  const handleConfirmDelete = async () => {
    await CalendarService.deleteEvent(modalData.id);
    handleCloseConfirmModal();
  }

  const handleOpenDeleteModal = () => {
    handleCloseModal();
    setShowDeleteModal(true);
  }


  const start = formatDate(modalData.start);
  const end = modalData.end ? formatDate(subtractOneDay(modalData.end)) : start;

  const description = modalData.description || "Sin descripción";


  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.title || "Evento"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Fecha de inicio:</strong> {start}</p>
          <p><strong>Fecha de fin:</strong> {end}</p>
          <p><strong>Descripción:</strong> {description}</p>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <button className="btn btn-secondary" onClick={handleEdit}>Editar</button>
          <button className="btn btn-danger" onClick={handleOpenDeleteModal}>Borrar</button>
        </Modal.Footer>
      </Modal>

      <ConfirmModal
            show={showDeleteModal}
            handleClose={handleCloseConfirmModal}
            title={'Confirmar eliminación'}
            content={`¿Seguro que desea eliminar el material ${modalData.title} ?`}
            onConfirm={handleConfirmDelete}
            onCancel={handleCloseConfirmModal}

          />
    </>

  );
}

export default EventModal;
