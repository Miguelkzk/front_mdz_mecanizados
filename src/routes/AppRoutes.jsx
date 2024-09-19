import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ColorSchemesExample from '../components/NavBar';
import Orders from '../pages/Orders';
import OrderDetail from '../components/Order/OrderDetail';
import Clients from '../pages/Clients';
import Suppliers from '../pages/suppliers';

const AppRoutes = () => {
  return (
    <Router>
      <div>
        < ColorSchemesExample />
        <Routes>
          <Route path="/" element={< Orders />} />
          <Route path="/order-detail" element={<OrderDetail />} />
          <Route path="/clients" element={< Clients />} />
          <Route path="/suppliers" element={< Suppliers />} />

        </Routes>
      </div>
    </Router>
  )
}
export default AppRoutes;