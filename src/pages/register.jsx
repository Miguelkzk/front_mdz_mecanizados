import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { authService } from "../service/authService";
import { useTranslation } from "react-i18next";
import Notification from "../components/notification";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "admin"});
  const [exception, setExeption] = useState('')
  const { t } = useTranslation();
  const [notification, setNotification] = useState({ show: false, message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    await authService.register({ user: form });
    setNotification({ show: true, message: 'Usuario registrado correctamente' });
    setForm({ name: "", email: "", password: "", role: "admin"})
  };

  const handleCloseNotification = () => {
    setNotification({ show: false, message: '' });
  };

  return (
    <>
      <div style={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src="/logo_MM__1_-removebg-preview.png" alt="Logo" />
        </div>
        <div style={styles.headerContainer}>
          <h2 style={styles.title}>Nuevo usuario</h2>
        </div>
        <hr />
        <Form>
          <Form.Group>
            <Form.Label>Nombre de usuario:</Form.Label>
            <FormControl
              type="text"
              placeholder="Ingrese el nombre de usuario"
              name="name"
              value={form.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Email:</Form.Label>
            <FormControl
              type="text"
              placeholder="Ingrese su email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Contraseña:</Form.Label>
            <FormControl
              type="password"
              placeholder="Ingrese la contraseña"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              isInvalid={''}
            />
          </Form.Group>
        </Form>
        <p style={{ color: 'red' }}>{t(exception)}</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
          <Button onClick={handleSubmit}>Registrar</Button>
        </div>
      </div>

      <Notification
            show={notification.show}
            message={notification.message}
            onClose={handleCloseNotification}
          />

    </>);
} export default Register;
const styles = {
  container: {
    maxWidth: "30%",
    margin: "100px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    color: "#333",
    fontSize: "32px",
    textAlign: "center",
    marginBottom: "20px",
  }
}