import { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavDropdown, Container } from 'react-bootstrap';
import { authService } from '../service/authService';
import { FaUserCircle } from 'react-icons/fa';

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
    <Navbar bg="primary" variant="dark" expand="md">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Mueve los enlaces dentro de Nav para evitar problemas de layout */}
            <Nav.Link href='/' style={styles.navLinks}>
              {t('Órdenes')}
            </Nav.Link>
            <Nav.Link href='/clients' style={styles.navLinks}>
              {t('Clientes')}
            </Nav.Link>
            <Nav.Link href='/suppliers' style={styles.navLinks}>
              {t('Proveedores')}
            </Nav.Link>
          </Nav>

          {user && (
            <Nav className="ml-auto">
              <NavDropdown
                title={
                  <>
                    <FaUserCircle style={{ marginRight: '5px' }} />
                    {user}
                  </>
                }
                id="basic-nav-dropdown"
                align="end"
                menuVariant="dark"
              >
                <NavDropdown.Item href="/register">Registrar usuario</NavDropdown.Item>
                <NavDropdown.Item onClick={logut}>Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
const styles = {
  navLinks : {
    cursor: "pointer",
    color: "white",
    fontSize: "20px"
  }
}
