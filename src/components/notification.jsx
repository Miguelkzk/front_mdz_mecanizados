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
    position: 'absolute',
    top: '2%',
    right: '40%',
    left: '40%',
    zIndex: 1050,
    width: '20%',
    height: '10%',
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
