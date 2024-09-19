import { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

function NavBar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage('es');
  }, []);

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <span style={{ marginLeft: '1%', cursor: 'pointer' }}>
          <Navbar.Brand onClick={() => navigate('/')} >{t('Órdenes')}</Navbar.Brand>
          <Navbar.Brand onClick={() => navigate('/clients')} >{t('Clientes')}</Navbar.Brand>
          <Navbar.Brand onClick={() => navigate('/suppliers')} >{t('Proveedores')}</Navbar.Brand>

        </span>
      </Navbar>
    </>
  );
}

export default NavBar;