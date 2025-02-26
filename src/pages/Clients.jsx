import { useEffect, useState } from "react";
import GenericTable from "../components/GenericTable";
import { ClientService } from "../service/Client";
import { Button } from "react-bootstrap";
import NameForm from "../components/Name.form";
import "../styles/clients&suppliers.css"

function Clients() {
  const fields = ['name', 'phone', 'email'];
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
      <div className="container">
        <div className="headerContainer">
          <h2 className="title" >Clientes</h2>
          <Button className="newButton"  onClick={() => handleOpenModal()}>
            Nuevo cliente
          </Button>
        </div>

        <hr />
        <div className="tableContainer">
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
        show={showForm}
        handleClose={handleCloseModal}
        title={title}
        type={"client"}
        editElement={client}
      />
    </>
  );
  }
export default Clients;
