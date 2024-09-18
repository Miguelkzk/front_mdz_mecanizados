import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericTable from "../components/GenericTable";
import { OrderService } from "../service/Order";
import { Button, Form } from "react-bootstrap";
import OrderForm from "../components/Order/OrderForm";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filterState, setFilterState] = useState('');
  const [purchaseOrder, setPurchaseOrder] = useState('');
  const [clientName, setClientName] = useState('');
  const [orderName, setOrderName] = useState('');
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const fields = [
    'purchase_order',
    'client',
    'name',
    'state'
  ];

  useEffect(() => {
    fetchOrders();
  }, [filterState, purchaseOrder, clientName, orderName]);

  const fetchOrders = async () => {
    const ordersData = await OrderService.getOrders({
      state: filterState,
      purchaseOrder: purchaseOrder,
      clientName: clientName,
      orderName: orderName
    });
    setOrders(ordersData);
  };

  const viewDetail = (element) => {
    navigate('/order-detail', { state: { order: element } });
  };

  const handleCloseModal = () => {
    setShowForm(false);
    fetchOrders();
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h2 style={styles.title}>Órdenes</h2>
        <Button style={styles.newOrderButton} onClick={() => setShowForm(true)}>Nueva orden</Button>
      </div>
      <hr />
      <div style={styles.actionsContainer}>
        <div style={styles.filterContainer}>
          <label style={styles.filterLabel}>Filtrar por estado:</label>
          <Form.Select
            style={styles.filter}
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
          >
            <option value="without_material">Sin material</option>
            <option value="with_material_but_not_started">Con material, pero no iniciado</option>
            <option value="in_progress">En progreso</option>
            <option value="not_invoiced">No facturado</option>
            <option value="delivered_and_invoiced">Entregado y facturado</option>
            <option value="incomplete">Incompleto</option>
          </Form.Select>
        </div>
        <div style={styles.formFilterContainer}>
          <label style={styles.filterLabel}>Buscar por orden de compra:</label>
          <Form.Control
            type="text"
            placeholder="Nro. de orden de compra"
            value={purchaseOrder}
            onChange={(e) => setPurchaseOrder(e.target.value)}
            style={styles.formFilterInput}
          />
        </div>
        <div style={styles.formFilterContainer}>
          <label style={styles.filterLabel}>Buscar por cliente:</label>
          <Form.Control
            type="text"
            placeholder="Nombre cliente"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            style={styles.formFilterInput}
          />
        </div>
        <div style={styles.formFilterContainer}>
          <label style={styles.filterLabel}>Buscar por nombre:</label>
          <Form.Control
            type="text"
            placeholder="Nombre de la orden"
            value={orderName}
            onChange={(e) => setOrderName(e.target.value)}
            style={styles.formFilterInput}
          />
        </div>
      </div>
      <div style={styles.tableContainer}>
        <GenericTable
          fields={fields}
          elements={orders}
          viewButton={true}
          textViewButton={"Ver detalle"}
          viewElement={viewDetail}
        />
      </div>
      <OrderForm
        show={showForm}
        handleClose={handleCloseModal}
        title={'Nueva orden'}
        editOrder={''}
      />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "70%", // Más ancho para pantallas pequeñas
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: 'relative',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexWrap: 'wrap', // Para que el botón se mueva hacia abajo si el espacio es pequeño
  },
  title: {
    color: "#333",
    fontSize: "32px",
    textAlign: "center",
    flex: "1 1 100%", // Ocupa todo el ancho disponible en pantallas pequeñas
  },
  newOrderButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginBottom: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    flex: "1 1 100%", // Para pantallas pequeñas, el botón ocupará todo el ancho disponible
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '20px',
    flexWrap: 'wrap', // Hace que los elementos se ajusten en pantallas pequeñas
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    flex: '1 1 200px', // Ocupa el espacio necesario pero se ajusta en pantallas pequeñas
  },
  formFilterContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    flex: '1 1 200px', // Similar al filtro
  },
  filterLabel: {
    marginBottom: '5px',
    fontSize: '14px',
    color: '#555',
  },
  filter: {
    width: '100%', // Se ajusta a su contenedor
  },
  formFilterInput: {
    width: '100%', // Se ajusta a su contenedor
  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

export default Orders;
