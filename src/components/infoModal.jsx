import { Modal, Button } from "react-bootstrap";

function InfoModal({ show, handleClose, content }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body style={{ textAlign: "center", padding: "2rem 1.5rem" }}>
        <p style={{ fontSize: "1.25rem", fontWeight: "500", marginBottom: "1.5rem", color: "#343a40" }}>
          {content}
        </p>
        <Button
          variant="primary"
          onClick={handleClose}
          style={{
            backgroundColor: "#007bff",
            borderColor: "#007bff",
            padding: "0.5rem 1.5rem",
            fontSize: "1rem",
            fontWeight: "500"
          }}
        >
          Cerrar
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default InfoModal;
