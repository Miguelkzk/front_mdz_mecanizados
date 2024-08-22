import { useState } from "react";
import { Button, Form, FormControl, Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { ClientService } from "../../service/Client";

function OrderForm({ show, handleClose }) {
  const [filter, setFilter] = useState('');
  const [client, setClient] = useState({});
  const [exception, setException] = useState(false);
  const [ok, setOk] = useState(false);
  const [order, setOrder] = useState({
    id: '',
    name: '',
    purchase_order: '',
    quantity: '',
    ingresed_at: '',
    delivery_at: '',
    total_price: '',
    unit_price: '',
    comment: '',
    state: '',
    currency: '',
    client_id: ''
  });

  const handleCloseModal = () => {
    setFilter('');
    handleClose();
    setException(false);
    setOk(false);
    setClient({});
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value
    }));
  };

  return (
    <Modal show={show} onHide={handleCloseModal} className="modal-lg">
      <Modal.Header closeButton>
        <ModalTitle>Nueva orden</ModalTitle>
      </Modal.Header>
      <ModalBody>
        <div style={{ display: 'flex', height: '100%' }}>
          {/* Primer columna: Campos de cliente y orden de compra */}
          <div style={{ flex: 1, paddingRight: '20px', borderRight: '1px solid #ddd' }}>
            <Form>
              <div style={{ display: 'flex', alignItems: 'initial' }}>
                <Form.Group style={{ flex: 1, marginRight: '10px' }}>
                  <Form.Label>Buscar cliente</Form.Label>
                  <Form.Control
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Ingrese el nombre"
                  />
                </Form.Group>
                <Button
                  style={{ maxHeight: '40px', marginTop: '9%' }}
                  onClick={searchClient}
                >
                  Buscar
                </Button>
              </div>
              {exception && (
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
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Nombre</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Ingrese el nombre"
                  name="name"
                  value={order.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Cantidad</Form.Label>
                <FormControl
                  type="number"
                  placeholder="Ingrese la cantidad"
                  name="quantity"
                  value={order.quantity}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Tipo de moneda</Form.Label>
                <Form.Select name="currency" value={order.currency} onChange={handleInputChange}>
                  <option value="0">ARS</option>
                  <option value="1">USD</option>
                </Form.Select>
              </Form.Group>

            </Form>
          </div>
          {/* Segunda columna: Más campos */}
          <div style={{ flex: 1, paddingLeft: '20px' }}>
            <Form>
              <Form.Group>
                <Form.Label>Fecha de ingreso</Form.Label>
                <Form.Control
                  type="date"
                  name="ingresed_at"
                  value={order.ingresed_at}
                  onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Fecha de entrega</Form.Label>
                <Form.Control
                  type="date"
                  name="delivery_at"
                  value={order.delivery_at}
                  onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Precio unitario</Form.Label>
                <FormControl
                  type="number"
                  placeholder="Ingrese el monto"
                  name="unit_price"
                  value={order.unit_price}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Observaciones</Form.Label>
                <FormControl
                  type="text"
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
            <Button>Guardar orden</Button>
          </div>
      </ModalBody>
    </Modal>
  );
}

export default OrderForm;
