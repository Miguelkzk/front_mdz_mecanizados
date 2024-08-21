import { useEffect, useState } from "react";
import GenericTable from "../components/GenericTable";
import { OrderService } from "../service/Order";

function Orders() {
  const [orders, setOrders] = useState([]);

  const fields = [
    'purchase_order',
    'client',
    'name',
    'state'
  ]

  useEffect(()=> {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const ordersData = await OrderService.getOrders();
    setOrders(ordersData)
    console.log(ordersData)
  }

  const viewDetail = (element) => {
    console.log(element)
  }
  return (
    <>
      <div className="mt-3">
        <GenericTable
        fields={fields}
        elements={orders}
        viewButton={true}
        textViewButton={"Ver detalle"}
        viewElement={viewDetail}
         />
      </div>
    </>

  )
}
export default Orders;
