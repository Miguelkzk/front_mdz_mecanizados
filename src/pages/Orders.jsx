import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import GenericTable from "../components/GenericTable";
import { OrderService } from "../service/Order";
import { Button, Form } from "react-bootstrap";
import OrderForm from "../components/Order/OrderForm";
import '../styles/Orders.css';

function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [filterState, setFilterState] = useState(searchParams.get('state') || '');
  const [purchaseOrder, setPurchaseOrder] = useState(searchParams.get('purchaseOrder') || '');
  const [clientName, setClientName] = useState(searchParams.get('clientName') || '');
  const [orderName, setOrderName] = useState(searchParams.get('orderName') || '');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
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
    fetchOrders(currentPage);
  }, [filterState, purchaseOrder, clientName, orderName, currentPage]);

  const fetchOrders = async (page) => {
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

    // Actualizar los parámetros de la URL con la página y filtros actuales
    setSearchParams({
      page: ordersData.current_page,
      state: filterState,
      purchaseOrder: purchaseOrder,
      clientName: clientName,
      orderName: orderName
    });
  };

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
    setCurrentPage(1); // Reiniciar a la primera página al aplicar un filtro
  };

  const viewDetail = (element) => {
    navigate('/order-detail', { state: { order: element } });
  };

  const handleCloseModal = () => {
    setShowForm(false);
    fetchOrders(currentPage);
  };

  const goToNextPage = () => {
    if (nextPage) {
      setCurrentPage(nextPage);
    }
  };

  const goToPrevPage = () => {
    if (prevPage) {
      setCurrentPage(prevPage);
    }
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
              onChange={handleFilterChange(setFilterState)}
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
              onChange={handleFilterChange(setPurchaseOrder)}
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
              onChange={handleFilterChange(setClientName)}
              className="formFilterInput"
            />
          </div>
          <div className="formFilterContainer">
            <label className="filterLabel">Buscar por nombre:</label>
            <Form.Control
              type="text"
              placeholder="Nombre de la orden"
              value={orderName}
              onChange={handleFilterChange(setOrderName)}
              className="formFilterInput"
            />
          </div>
        </div>
      </div>
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
        <button type="button" className="btn btn-outline-primary" onClick={goToPrevPage} disabled={!prevPage}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button type="button" className="btn btn-outline-primary" onClick={goToNextPage} disabled={!nextPage}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Orders;
