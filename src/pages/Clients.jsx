import { useEffect, useState } from "react";
import GenericTable from "../components/GenericTable";
import { ClientService } from "../service/Client";
import { Button } from "react-bootstrap";
import NameForm from "../components/Name.form";

function Clients() {
  const fields = ['name'];
  const [clients, setClients] = useState([]);
  const [client, setClient] =useState(false);
  const [title, setTitle] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const data = await ClientService.getClients(name);
    setClients(data);
  };

  const handleOpenModal = ()=> {
    setTitle('Nuevo cliente')
    setShowForm(true);

  }

  const handleCloseModal = () => {
    setShowForm(false);
    setTitle('');
    fetchClients();
    setClient(false);
  };

  const editClient = (element) => {
    setClient(element);
    setTitle('Editar cliente');
    setShowForm(true)
  }

  return (
    <>
    <div style={styles.container}>
      <div style={styles.headerContainer}>

        <h2 style={styles.title}>Clientes</h2>
        <Button style={styles.newClientButton} onClick={() => (handleOpenModal())}>Nuevo cliente</Button>
      </div>

      <hr />
      <div style={styles.tableContainer}>
        <GenericTable
          fields={fields}
          elements={clients}
          viewButton={false}
          editButton={true}
          editElement={editClient}
        />
      </div>
    </div>
    <NameForm
    show = {showForm}
    handleClose={handleCloseModal}
    title={title}
    type={'client'}
    editElement={client}
    />
    </>

  );
}

const styles = {
  container: {
    maxWidth: "50%",
    margin: "20px auto",
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
  },
  tableContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  newClientButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginBottom: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    flex: "1 1 100%", // Para pantallas pequeñas, el botón ocupará todo el ancho disponible
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexWrap: 'wrap', // Para que el botón se mueva hacia abajo si el espacio es pequeño
  },
};

export default Clients;
