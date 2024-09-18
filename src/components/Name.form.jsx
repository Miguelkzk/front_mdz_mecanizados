import { useState } from "react";
import { Form, FormControl, Modal, ModalBody } from "react-bootstrap";

function NameForm({show, handleClose, title, type}) {
  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setName((prevName) => ({
      ...prevName,
      [name]: value
    }));
  };

  const handleCloseModal = () => {
    handleClose();
  }

  const handleSave = () => {

  }

  return (
    <Modal show={show} onHide={handleCloseModal} >
      <Modal.Header closeButton className="text-center">
        <Modal.Title style={{ textAlign: 'center', width: '100%' }}> {title} </Modal.Title>
      </Modal.Header>
      <ModalBody>
        <Form>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <FormControl
              type="text"
              placeholder="Ingrese el nombre"
              name="name"
              value={name}
              onChange={handleInputChange}
              //isInvalid={!!errors.name}
            />
            {/* {errors.purchase_order && <Form.Text className="text-danger">{errors.purchase_order}</Form.Text>} */}
          </Form.Group>
        </Form>
      </ModalBody>
    </Modal >
  )
} export default NameForm;