import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Orders from '../pages/Orders';
import OrderDetail from '../components/Order/OrderDetail';
import Clients from '../pages/Clients';
import Navbar from '../components/NavBar';
import Suppliers from '../pages/suppliers';
import Login from '../pages/login';
import ProtectedRoute from '../components/ProtectedRoute';
import Register from '../pages/register';
import Remunerations from '../pages/Remunerations';
import RemunerationDetail from '../components/RemunerationDetail';
import MaintenancePlan from '../pages/Maintenance_plan';
import Machines from '../pages/Machines';
import MaintenanceIndex from '../components/maintenance/MaintenanceIndex';
import Assessments from '../components/Assessments/Assessments';

const AppRoutes = () => {
  const location = useLocation(); // Obtener la ubicación actual

  return (
    <div>
      {location.pathname !== '/login' && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={Orders} />} />
        <Route path="/order-detail" element={<ProtectedRoute element={OrderDetail} />} />
        <Route path="/clients" element={<ProtectedRoute element={Clients} />} />
        <Route path="/suppliers" element={<ProtectedRoute element={Suppliers} />} />
        <Route path="/register" element={<ProtectedRoute element={Register} />} />
        <Route path="/profits" element={<ProtectedRoute element={Remunerations} />} />
        <Route path='/profit-detail' element={<ProtectedRoute element={RemunerationDetail} />} />
        <Route path="/maintenance-plan" element={<ProtectedRoute element={MaintenancePlan} />} />
        <Route path="/machines" element={<ProtectedRoute element={Machines} />} />
        <Route path="/machine-detail" element={<ProtectedRoute element={MaintenanceIndex} />} />
        <Route path="/assessments" element={<ProtectedRoute element={Assessments} />} />


      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
