import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ColorSchemesExample from '../components/NavBar';
import OrdersTable from '../pages/Orders';

const AppRoutes = () => {
  return (
    <Router>
      <div>
        < ColorSchemesExample />
        <Routes>
          <Route path="/" element={< OrdersTable />} />
        </Routes>
      </div>
    </Router>
  )
}
export default AppRoutes;