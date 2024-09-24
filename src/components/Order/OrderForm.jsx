import { useEffect, useState } from "react";
import { Button, Form, FormControl, Modal, ModalBody, Spinner } from "react-bootstrap";
import { ClientService } from "../../service/Client";
import InfoModal from "../infoModal";
import { OrderService } from "../../service/Order";
import Notification from "../notification";
import NameForm from "../Name.form";

function OrderForm({ show, handleClose, editOrder, title, nameClient, orderSelected }) {
  const [errors, setErrors] = useState({});
  const [clientName, setClientName] = useState('');
  const [selectedOrder, setSelectedOrder] = useState();
  const [filteredClients, setFilteredClients] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [showClientForm, setShowClientForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [order, setOrder] = useState({
    name: '',
    purchase_order: '',
    quantity: '',
    ingresed_at: '',
    estimated_delivery_date: '',
    unit_price: '',
    comment: '',
    currency: '',
    state: 'incomplete'
  });
  const handleCloseModal = () => {
    handleClose();
    setOrder({
      name: '',
      purchase_order: '',
      quantity: '',
      ingresed_at: '',
      estimated_delivery_date: '',
      unit_price: '',
      comment: '',
      currency: '',
      state: 'incomplete'

    });
    setErrors({});
    setClientName('');
    setFilteredClients([]);
  };

  useEffect(() => {
    if (editOrder) {
      setOrder({
        ...editOrder,
        comment: editOrder.comment || ''
      });
      setSelectedOrder(orderSelected);
      setClientName(nameClient);
      setTimeout(() => {
        setFilteredClients([]);
      }, 100);
    }
  }, [editOrder]);

  const validateForm = () => {
    let formErrors = {};
    if (!order.client_id) formErrors.client = "Debe seleccionar un cliente";
    if (!order.name) formErrors.name = "El nombre es requerido";
    if (!order.purchase_order) formErrors.purchase_order = "La orden de compra es requerida";
    if (!order.quantity || order.quantity <= 0) formErrors.quantity = "La cantidad debe ser mayor que 0";
    if (!order.ingresed_at) formErrors.ingresed_at = "La fecha de ingreso es requerida";
    if (!order.estimated_delivery_date) formErrors.estimated_delivery_date = "La fecha de entrega es requerida";
    if (!order.unit_price || order.unit_price <= 0) formErrors.unit_price = "El precio unitario debe ser mayor que 0";
    if (!order.currency) formErrors.currency = "Debe seleccionar un tipo de moneda";

    const ingresedAtDate = new Date(order.ingresed_at);
    const deliveryAtDate = new Date(order.estimated_delivery_date);

    if (deliveryAtDate <= ingresedAtDate) {
      formErrors.estimated_delivery_date = "La fecha de entrega debe ser posterior a la fecha de ingreso";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        if (editOrder) {
          setIsUploading(true);
          await OrderService.editOrder(order, selectedOrder);
          setIsUploading(false);

        }
        else {
          setIsUploading(true);
          await OrderService.newOrder(order);
          setNotification({ show: true, message: 'Se ha creado una nueva orden.' });
          setIsUploading(false);
        }
        handleCloseModal();
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleClientSelect = (client) => {
    setClientName(client.name);
    setOrder((prevOrder) => ({
      ...prevOrder,
      client_id: client.id
    }));

    setTimeout(() => {
      setFilteredClients([]);
    }, 100);
  }

  useEffect(() => {
    if (clientName.length > 0) {
      fetchClients();
    } else {
      setFilteredClients([]);
    }
  }, [clientName]);

  const fetchClients = async () => {
    const callClients = await ClientService.getClients(clientName)
    setFilteredClients(callClients); // Filtra la lista conforme el usuario escribe
  };

  const handleCloseNotification = () => {
    setNotification({ show: false, message: '' });
  };

  const handleCloseClientModal = () => {
    setShowClientForm(false);
  }

  return (<>
    <Modal show={show} onHide={handleCloseModal} className="modal-lg">
      <Modal.Header closeButton className="text-center">
        <Modal.Title style={{ textAlign: 'center', width: '100%' }}> {title} </Modal.Title>
      </Modal.Header>
      <ModalBody>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flex: 1, paddingRight: '20px', borderRight: '1px solid #ddd' }}>
            <Form>
              <Form.Group style={{ flex: 1, marginRight: '10px' }}>
                <Form.Label>Buscar cliente</Form.Label>
                <Form.Control
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ingrese el nombre del cliente"
                  isInvalid={!!errors.client}
                />
                {errors.client_id && <Form.Text className="text-danger">{errors.client_id}</Form.Text>}

                {filteredClients.length > 0 && (
                  <ul style={{ maxHeight: '150px', overflowY: 'auto', backgroundColor: 'white', border: '1px solid #ced4da' }}>
                    {filteredClients.map((client) => (
                      <li
                        key={client.id}
                        style={{ padding: '5px', cursor: 'pointer' }}
                        onClick={() => handleClientSelect(client)}
                      >
                        {client.name}
                      </li>
                    ))}
                  </ul>
                )}
              </Form.Group>

              <a
                role="button"
                onClick={() => setShowClientForm(true)}
                style={{
                  textDecoration: 'underline',
                  color: '#007bff',
                  cursor: 'pointer',
                }}
              >
                ¿Nuevo cliente?
              </a>

              <Form.Group className="mt-2">
                <Form.Label>Orden de compra</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Ingrese orden de compra"
                  name="purchase_order"
                  value={order.purchase_order}
                  onChange={handleInputChange}
                  isInvalid={!!errors.purchase_order}
                />
                {errors.purchase_order && <Form.Text className="text-danger">{errors.purchase_order}</Form.Text>}
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Nombre</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Ingrese el nombre"
                  name="name"
                  value={order.name}
                  onChange={handleInputChange}
                  isInvalid={!!errors.name}
                />
                {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Cantidad</Form.Label>
                <FormControl
                  type="number"
                  placeholder="Ingrese la cantidad"
                  name="quantity"
                  value={order.quantity}
                  onChange={handleInputChange}
                  isInvalid={!!errors.quantity}
                  min="0"
                />
                {errors.quantity && <Form.Text className="text-danger">{errors.quantity}</Form.Text>}
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Tipo de moneda</Form.Label>
                <Form.Select
                  name="currency"
                  value={order.currency}
                  onChange={handleInputChange}
                  isInvalid={!!errors.currency}
                >
                  <option value="">Seleccionar</option>
                  <option value="ars">ARS</option>
                  <option value="usd">USD</option>
                </Form.Select>
                {errors.currency && <Form.Text className="text-danger">{errors.currency}</Form.Text>}
              </Form.Group>

            </Form>
          </div>
          <div style={{ flex: 1, paddingLeft: '20px' }}>
            <Form>
              <Form.Group>
                <Form.Label>Fecha de ingreso</Form.Label>
                <Form.Control
                  type="date"
                  name="ingresed_at"
                  value={order.ingresed_at}
                  onChange={handleInputChange}
                  isInvalid={!!errors.ingresed_at}
                />
                {errors.ingresed_at && <Form.Text className="text-danger">{errors.ingresed_at}</Form.Text>}
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Fecha de entrega pactada</Form.Label>
                <Form.Control
                  type="date"
                  name="estimated_delivery_date"
                  value={order.estimated_delivery_date}
                  onChange={handleInputChange}
                  isInvalid={!!errors.estimated_delivery_date}
                />
                {errors.estimated_delivery_date && <Form.Text className="text-danger">{errors.estimated_delivery_date}</Form.Text>}
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Precio unitario</Form.Label>
                <FormControl
                  type="number"
                  placeholder="Ingrese el monto"
                  name="unit_price"
                  value={order.unit_price}
                  onChange={handleInputChange}
                  isInvalid={!!errors.unit_price}
                  min="0.0"
                />
                {errors.unit_price && <Form.Text className="text-danger">{errors.unit_price}</Form.Text>}
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Observaciones</Form.Label>
                <FormControl
                  as="textarea"
                  rows={4}
                  placeholder="Ingrese las observaciones"
                  name="comment"
                  value={order.comment}
                  onChange={handleInputChange}
                />
              </Form.Group>

            </Form>
          </div>
        </div>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
          <Button onClick={handleSave} disabled={isUploading}>
            {isUploading ? (
              <>
               <Spinner
                    animation="border"
                    size="sm"
                    style={{marginTop: "8px"}}
                  />{" "}
                  Guardando...
              </>
            ) : (
              'Guardar orden'
            )}



          </Button>
        </div>
        <NameForm
          show={showClientForm}
          handleClose={handleCloseClientModal}
          title={'Nuevo Cliente'}
          type={'client'}
        />
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

export default OrderForm;