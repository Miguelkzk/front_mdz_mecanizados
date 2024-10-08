import { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavDropdown } from 'react-bootstrap';
import { authService } from '../service/authService';
import { FaUserCircle } from 'react-icons/fa'; // Importa el ícono

function NavBar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState('');

  useEffect(() => {
    i18n.changeLanguage('es');
    getUser();
  }, []);

  const getUser = () => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUser(name);
    }
  };

  const logut = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('authToken');
      localStorage.removeItem('roleUser');
      localStorage.removeItem('userName');
      window.location.href = '/login';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" style={{ justifyContent: 'space-between' }}>
      <span style={{ marginLeft: '1%', cursor: 'pointer' }}>
        <Navbar.Brand onClick={() => navigate('/')}>{t('Órdenes')}</Navbar.Brand>
        <Navbar.Brand onClick={() => navigate('/clients')}>{t('Clientes')}</Navbar.Brand>
        <Navbar.Brand onClick={() => navigate('/suppliers')}>{t('Proveedores')}</Navbar.Brand>
      </span>
      <span style={{ marginRight: '1%', cursor: 'pointer', color: 'white', fontSize: '1.2rem' }}>
        {user && (
          <NavDropdown title={<><FaUserCircle style={{ marginRight: '5px' }} />{user}</>} id="basic-nav-dropdown" align="end" menuVariant="dark">
            <NavDropdown.Item href="/register">Registrar usuario</NavDropdown.Item>
            <NavDropdown.Item onClick={logut}>Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
        )}
      </span>
    </Navbar>
  );
}

export default NavBar;
