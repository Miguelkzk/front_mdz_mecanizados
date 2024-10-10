import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericTable from "../components/GenericTable";
import { OrderService } from "../service/Order";
import { Button, Form } from "react-bootstrap";
import OrderForm from "../components/Order/OrderForm";
import '../styles/Orders.css'

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filterState, setFilterState] = useState('');
  const [purchaseOrder, setPurchaseOrder] = useState('');
  const [clientName, setClientName] = useState('');
  const [orderName, setOrderName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const fields = [
    'purchase_order',
    'client',
    'name',
    'state'
  ];

  useEffect(() => {
    fetchOrders();
  }, [filterState, purchaseOrder, clientName, orderName]);

  const fetchOrders = async (page = 1) => {
    const ordersData = await OrderService.getOrders({
      state: filterState,
      purchaseOrder: purchaseOrder,
      clientName: clientName,
      orderName: orderName,
      page: page
    });
    setOrders(ordersData.orders);
    setCurrentPage(ordersData.current_page);
    setTotalPages(ordersData.total_pages);
    setNextPage(ordersData.next_page);
    setPrevPage(ordersData.prev_page);
  };

  const viewDetail = (element) => {
    navigate('/order-detail', { state: { order: element } });
  };

  const handleCloseModal = () => {
    setShowForm(false);
    fetchOrders();
  };

  return (
    <div className="container">
      <div className="headerContainer">
        <h2 className="title">Órdenes</h2>
        <Button className="newOrderButton" onClick={() => setShowForm(true)}>Nueva orden</Button>
      </div>
      <hr />
      <div className="actionsContainer">

        <div className="groupContainer">

          <div className="filterContainer">
            <label className="filterLabel">Filtrar por estado:</label>
            <Form.Select
              className="filter"
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="without_material">Sin material</option>
              <option value="with_material_but_not_started">Con material, pero no iniciado</option>
              <option value="in_progress">En progreso</option>
              <option value="not_invoiced">No facturado</option>
              <option value="delivered_and_invoiced">Entregado y facturado</option>
              <option value="incomplete">Incompleto</option>
            </Form.Select>
          </div>
          <div className="formFilterContainer">
            <label className="filterLabel">Buscar por orden de compra:</label>
            <Form.Control
              type="text"
              placeholder="Nro. de orden de compra"
              value={purchaseOrder}
              onChange={(e) => setPurchaseOrder(e.target.value)}
              className="formFilterInput"
            />
          </div>

        </div>
        <div className="groupContainer">

          <div className="formFilterContainer">
            <label className="filterLabel">Buscar por cliente:</label>
            <Form.Control
              type="text"
              placeholder="Nombre cliente"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="formFilterInput"
            />
          </div>
          <div className="formFilterContainer">
            <label className="filterLabel">Buscar por nombre:</label>
            <Form.Control
              type="text"
              placeholder="Nombre de la orden"
              value={orderName}
              onChange={(e) => setOrderName(e.target.value)}
              className="formFilterInput"
            />
          </div>

        </div>

      </div >
      <div className="tableContainer">
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

      <div className="paginationContainer">
        <button type="button" className="btn btn-outline-primary"
          onClick={() => fetchOrders(prevPage)}
          disabled={!prevPage}
        >
          Anterior
        </button>

        <span>Página {currentPage} de {totalPages}</span>

        <button type="button" className="btn btn-outline-primary"
          onClick={() => fetchOrders(nextPage)}
          disabled={!nextPage}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Orders;
