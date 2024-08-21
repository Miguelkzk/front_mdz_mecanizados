import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ColorSchemesExample from '../components/NavBar';
import Orders from '../pages/Orders';

const AppRoutes = () => {
  return (
    <Router>
      <div>
        < ColorSchemesExample />
        <Routes>
          <Route path="/" element={< Orders />} />
        </Routes>
      </div>
    </Router>
  )
}
export default AppRoutes;