import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericTable from "../components/GenericTable";
import { OrderService } from "../service/Order";
import { Button } from "react-bootstrap";
import OrderForm from "../components/Order/OrderForm";

function Orders() {
  const [orders, setOrders] = useState([]);
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
  }, []);

  const fetchOrders = async () => {
    const ordersData = await OrderService.getOrders();
    setOrders(ordersData);
  };

  const viewDetail = (element) => {
    navigate('/order-detail', { state: { order: element } });
  };


  const handleCloseModal = () =>{
    setShowForm(false);
    fetchOrders();
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Órdenes</h2>
      <div style={{width:'100%', display:'flex', justifyContent:'end'}}>
        <Button style={{marginBottom:'2%'}} onClick={ () => setShowForm(true)}>Nueva orden</Button>
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
      />
    </div>

  );
}

const styles = {
  container: {
    maxWidth: "70%",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontSize: "32px",
  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

export default Orders;
