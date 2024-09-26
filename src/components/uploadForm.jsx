import React, { useState } from "react";
import { Button, Form, Modal, ModalBody, Spinner } from "react-bootstrap";

function UploadForm({ show, handleClose, handleSubmit }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCloseModal = () => {
    if (!isUploading) {
      handleClose();
      setFile(null)
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      setIsUploading(true);
      await handleSubmit(file);
      setIsUploading(false);
      setFile(null)
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleCloseModal} className="modal-lg">
      <Modal.Header closeButton className="text-center"></Modal.Header>
      <ModalBody>
        <div style={styles.container}>
          <h2 style={styles.title}>Subir Archivo</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Seleccionar Archivo:</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button
              style={styles.submitButton}
              type="submit"
              disabled={isUploading || !file}
            >
              {isUploading ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    style={styles.spinner}
                  />{" "}
                  Subiendo...
                </>
              ) : (
                "Subir"
              )}
            </Button>
          </Form>
        </div>
      </ModalBody>
    </Modal>
  );
}

const styles = {
  container: {
    maxWidth: "100%",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontSize: "32px",
  },
  submitButton: {
    marginTop: "20px",
    width: "100%",
  },
  spinner: {
    marginRight: "8px",
  },
};

export default UploadForm;
