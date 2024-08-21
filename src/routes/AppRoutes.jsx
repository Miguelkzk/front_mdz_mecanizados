import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ColorSchemesExample from '../components/NavBar';
import Orders from '../pages/Orders';
import OrderDetail from '../components/Order/OrderDetail';

const AppRoutes = () => {
  return (
    <Router>
      <div>
        < ColorSchemesExample />
        <Routes>
          <Route path="/" element={< Orders />} />
          <Route path="/order-detail" element={<OrderDetail />} />
        </Routes>
      </div>
    </Router>
  )
}
export default AppRoutes;