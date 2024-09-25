import { Button, Modal } from "react-bootstrap";
import "../components/styles.css"

function ConfirmModal({ show, title, content, onConfirm, onCancel }) {
  return (
    <>
      {show && <div className="global-backdrop" />}
      <Modal
        show={show}
        onHide={onCancel}
        centered
        backdrop="static"
        dialogClassName="modal-dialog-custom"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
