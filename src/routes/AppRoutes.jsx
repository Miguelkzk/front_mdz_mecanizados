import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ColorSchemesExample from '../components/NavBar';
import JobsTable from '../pages/Articles';

const AppRoutes = () => {
  return (
    <Router>
      <div>
        < ColorSchemesExample />
        <Routes>
          <Route path="/" element={< JobsTable />} />
        </Routes>
      </div>
    </Router>
  )
}
export default AppRoutes;