import React, { useState } from 'react';
import { Button, Form, FormControl, Modal } from 'react-bootstrap';
import { OrderService } from '../../service/Order';

function ModalDelivery({ show, handleClose, handleSave, order }) {
  const [formData, setFormData] = useState({
    delivery_at: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleCloseModal = () => {
    setFormData({ delivery_at: '' });
    setErrors({});
    handleClose();
  };

  const handleSaveForm = async () => {
    if (validateForm()) {
      try {
        await OrderService.editOrder(formData, order.id);
        handleCloseModal();
        handleSave();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateForm = () => {
    let formErrors = {};
    console.log(order)
    if (!formData.delivery_at) {
      formErrors.delivery_at = "La fecha es requerida";
    } else {

      const deliveryDate = new Date(formData.delivery_at);
      const ingresedAtDate = new Date(order.ingresed_at);
      console.log(ingresedAtDate)
      if (isNaN(deliveryDate.getTime())) {
        formErrors.delivery_at = "La fecha ingresada no es válida";
      } else if (deliveryDate <= ingresedAtDate) {

        formErrors.delivery_at = "La fecha de entrega debe ser posterior a la fecha de ingreso";
      }
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Cierre de la orden</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Fecha de entrega</Form.Label>
            <FormControl
              type="date"
              placeholder="Ingrese la fecha en la que se entregó la orden"
              name="delivery_at"
              value={formData.delivery_at}
              onChange={handleInputChange}
              isInvalid={!!errors.delivery_at}
            />
            {errors.delivery_at && <Form.Text className="text-danger">{errors.delivery_at}</Form.Text>}
          </Form.Group>
        </Form>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
          <Button onClick={handleSaveForm}>Guardar</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDelivery;
