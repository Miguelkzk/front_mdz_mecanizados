import React from 'react';
import { Toast } from 'react-bootstrap';

const Notification = ({ show, message, onClose }) => {
  return (
    <Toast onClose={onClose} show={show} delay={2000} autohide style={styles.notification}>
      <Toast.Body style={styles.body}>{message}</Toast.Body>
    </Toast>
  );
};

const styles = {
  notification: {
    position: 'fixed', // Cambiado a fixed
    top: '2%', // Margen superior
    left: '50%', // Centrado horizontalmente
    transform: 'translateX(-50%)', // Ajuste para centrar
    zIndex: 1050,
    width: '320px',
    backgroundColor: '#28a745',
    color: '#ffffff',
    fontSize: '20px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  },
  body: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
};

export default Notification;
