import { Button, Modal, Spinner } from "react-bootstrap";
import React from "react";

function ConfirmModal({ show, title, content, onConfirm, onCancel, deleting }) {
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
        <Modal.Body>
          {deleting ? (
           <>
           <Spinner
            animation="border"
            size="sm"
           />{" "}
           Eliminando archivo...
           </>
          ) : (
            content
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={onConfirm} disabled={deleting}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
