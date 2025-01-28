import { Form, Modal } from "react-bootstrap";

function EventForm({ show, handleClose, data, isEdit, title}) {

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>

      </Form>
    </Modal.Body>
    <Modal.Footer style={{justifyContent: 'center'}}>
    </Modal.Footer>
  </Modal>
  )
} export default EventForm;