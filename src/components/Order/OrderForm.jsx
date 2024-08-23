import { useState } from "react";
import { Button, Form, FormControl, Modal, ModalBody, ModalTitle } from "react-bootstrap";
import { ClientService } from "../../service/Client";
import InfoModal from "../infoModal";
import { OrderService } from "../../service/Order";

function OrderForm({ show, handleClose }) {
  const [filter, setFilter] = useState('');
  const [client, setClient] = useState({});
  const [exceptionClient, setException] = useState(false);
  const [ok, setOk] = useState(false);
  const [errors, setErrors] = useState({});
  const [showinfoModal,setshowinfoModal] = useState(false)
  const [order, setOrder] = useState({
    name: '',
    purchase_order: '',
    quantity: '',
    ingresed_at: '',
    delivery_at: '',
    unit_price: '',
    comment: '',
    currency: '',
    state: 'incomplete'
  });

  const handleCloseModal = () => {
    setFilter('');
    handleClose();
    setException(false);
    setOk(false);
    setClient({});
    setOrder({
      name: '',
      purchase_order: '',
      quantity: '',
      ingresed_at: '',
      delivery_at: '',
      unit_price: '',
      comment: '',
      currency: '',
      state: 'incomplete'

    });
    setErrors({});
  };

  const handleCloseInfoModal = () => {
    setshowinfoModal(false)
  }

  const validateForm = () => {
    let formErrors = {};
    if(!filter) formErrors.client = "El cliente es requerido";
    if (!order.name) formErrors.name = "El nombre es requerido";
    if (!order.purchase_order) formErrors.purchase_order = "La orden de compra es requerida";
    if (!order.quantity || order.quantity <= 0) formErrors.quantity = "La cantidad debe ser mayor que 0";
    if (!order.ingresed_at) formErrors.ingresed_at = "La fecha de ingreso es requerida";
    if (!order.delivery_at) formErrors.delivery_at = "La fecha de entrega es requerida";
    if (!order.unit_price || order.unit_price <= 0) formErrors.unit_price = "El precio unitario debe ser mayor que 0";
    if (!order.currency) formErrors.currency = "Debe seleccionar un tipo de moneda";

    const ingresedAtDate = new Date(order.ingresed_at);
    const deliveryAtDate = new Date(order.delivery_at);

    if (deliveryAtDate <= ingresedAtDate) {
        formErrors.delivery_at = "La fecha de entrega debe ser posterior a la fecha de ingreso";
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
      if(exceptionClient == false) {
        try {
          setOrder(order.client_id = client.id)
          console.log(order)
          await OrderService.newOrder(order);
          handleCloseModal();
          setshowinfoModal(true);
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  const searchClient = async () => {
    setException(false);
    setOk(false);
    setClient({});
    try {
      const data = await ClientService.getClientByName(filter);
      setClient(data);
      setOk(true);
    } catch (error) {
      setException(true);
    }
  };

  return (<>
    <Modal show={show} onHide={handleCloseModal} className="modal-lg">
      <Modal.Header closeButton className="text-center">
        <Modal.Title style={{textAlign:'center', width: '100%'}}>Nueva orden</Modal.Title>
      </Modal.Header>
      <ModalBody>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flex: 1, paddingRight: '20px', borderRight: '1px solid #ddd' }}>
            <Form>
              <div style={{ display: 'flex', alignItems: 'initial' }}>
                <Form.Group style={{ flex: 1, marginRight: '10px' }}>
                  <Form.Label>Buscar cliente</Form.Label>
                  <Form.Control
                    type="text"
                    value={filter}
                    name = "client"
                    onChange={(e) => setFilter(e.target.value.toUpperCase())}
                    placeholder="Ingrese el nombre"
                    isInvalid={!!errors.client}

                  />
                {errors.client && <Form.Text className="text-danger">{errors.client}</Form.Text>}

                </Form.Group>
                <Button
                  style={{ maxHeight: '40px', marginTop: '9%' }}
                  onClick={searchClient}
                >
                  Buscar
                </Button>
              </div>
              {exceptionClient && (
                <p style={{ color: 'red', fontWeight: 'bold' }}>No se encontró el cliente</p>
              )}
              {ok && (
                <p style={{ color: '#2be337', fontWeight: 'bold' }}>Se encontró el cliente</p>
              )}
              <Form.Group className="mt-2">
                <Form.Label>Orden de compra</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Ingrese orden de compra"
                  name="purchase_order"
                  value={order.purchase_order}
                  onChange={handleInputChange }
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
                <Form.Label>Fecha de entrega</Form.Label>
                <Form.Control
                  type="date"
                  name="delivery_at"
                  value={order.delivery_at}
                  onChange={handleInputChange}
                  isInvalid={!!errors.delivery_at}
                />
                {errors.delivery_at && <Form.Text className="text-danger">{errors.delivery_at}</Form.Text>}
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
          <Button onClick={handleSave}>Guardar orden</Button>
        </div>
      </ModalBody>
    </Modal>

    <InfoModal
    show={showinfoModal}
    handleClose={handleCloseInfoModal}
    content={"Se ha creado una nueva orden"}
    />
    </>
  );
}

export default OrderForm;