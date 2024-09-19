import { useEffect, useState } from "react";
import { Button, Form, FormControl, Modal, ModalBody } from "react-bootstrap";
import { ClientService } from "../service/Client";
import { SupplierService } from "../service/Supplier";
import Notification from "./notification";

function NameForm({ show, handleClose, title, type, editElement }) {
  const [form, setForm] = useState({ name: '' });
  const [errors, setErrors] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '' });



  useEffect(() => {
    if (editElement) {
      setForm({ name: editElement.name || '' });
    }
  }, [editElement]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleCloseModal = () => {
    handleClose();
    setForm({ name: '' });
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        if (type === 'client') {
          if (editElement) {
            await ClientService.updateClient(form, editElement.id);
            setNotification({ show: true, message: 'Cliente editado correctamente' });

          } else {
            await ClientService.newClient(form);
            setNotification({ show: true, message: 'Cliente creado correctamente' });

          }
        } else if (type === 'supplier') {
          if (editElement) {
            await SupplierService.editSupplier(form, editElement.id);
            setNotification({ show: true, message: 'Proveedor editado correctamente' });
          } else {
            await SupplierService.newSupplier(form);
            setNotification({ show: true, message: 'Proveedor creado correctamente' });
          }
        }
        handleCloseModal();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!form.name) formErrors.name = 'El nombre no puede estar vacío';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleCloseNotification = () => {
    setNotification({ show: false, message: '' });
  };

  return (
    <>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton className="text-center">
          <Modal.Title style={{ textAlign: 'center', width: '100%' }}>{title}</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <FormControl
                type="text"
                placeholder="Ingrese el nombre"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                isInvalid={!!errors.name}
              />
              {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
            </Form.Group>
          </Form>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3%' }}>
            <Button onClick={handleSave}>Guardar</Button>
          </div>
        </ModalBody>
      </Modal>

      <Notification
      show={notification.show}
      message={notification.message}
      onClose={handleCloseNotification}
    />

    </>
  );
}

export default NameForm;
