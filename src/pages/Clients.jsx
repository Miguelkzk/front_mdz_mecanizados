import { useEffect, useState } from "react";
import GenericTable from "../components/GenericTable";
import { ClientService } from "../service/Client";

function Clients() {
  const fields = ['name'];
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const data = await ClientService.getClients();
    setClients(data);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Clientes</h2>
      <hr />
      <div style={styles.tableContainer}>
        <GenericTable
          fields={fields}
          elements={clients}
          viewButton={false}
          editButton={true}
          deleteButton={true}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "80%",
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
};

export default Clients;
