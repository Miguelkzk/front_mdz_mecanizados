import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { authService } from "../service/authService";
import { useTranslation } from "react-i18next";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [exception, setExeption] = useState('');
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Evitar el comportamiento predeterminado del formulario
    try {
      const response = await authService.login({ user: form });

      const { token, data } = response;
      const user = data.status.data.user;

      localStorage.setItem('authToken', token);
      localStorage.setItem('roleUser', user.role);
      localStorage.setItem('userName', user.name);

      setExeption('');
      window.location.href = '/';
    } catch (error) {
      const errorMessage = error.message || 'Error desconocido';
      console.log(errorMessage);
      setExeption(errorMessage);
    }
  };

  return (
    <>
      <div className="container" style={styles.container}>
        <div style={styles.formContainer}>
          <div className="col-12">
            <div style={{textAlign: 'center'}}>

            <img src="/logo_MM__1_-removebg-preview.png" alt="Logo" />
            </div>
          </div>
        </div>
        <div style={styles.headerContainer}>
          <h2 style={styles.title}>Inicio de sesión</h2>
        </div>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <FormControl
              type="email"
              placeholder="Ingrese su email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              autoComplete="email"
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
              autoComplete="current-password"
            />
          </Form.Group>
          <p style={{ color: 'red' }}>{t(exception)}</p>

          {/* Botón de submit que permitirá hacer el submit al presionar Enter */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
            <Button type="submit">Ingresar</Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Login;

const styles = {
  container: {
    marginTop: "5vh",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "500px",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    marginTop: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#333",
    fontSize: "32px",
    textAlign: "center",
    marginBottom: "20px",
  }
}
