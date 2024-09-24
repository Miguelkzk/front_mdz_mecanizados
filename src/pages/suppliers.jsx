import { useEffect, useState } from "react"
import { SupplierService } from "../service/Supplier";
import { Button } from "react-bootstrap";
import GenericTable from "../components/GenericTable";
import NameForm from "../components/Name.form";

function Suppliers(){
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState(false);
  const fields = ['name'];
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');


  const fetchSuppliers = async () => {
    const data  = await SupplierService.getSuppliers(name);
    setSuppliers(data);
  }

  useEffect(()=>{
    fetchSuppliers();
  }, []);

  const handleOpenModal = () => {
    setShowForm(true);
    setTitle('Nuevo proveedor');

  }

  const handleCloseModal = () =>{
    setShowForm(false);
    fetchSuppliers();
    setSupplier(false);
  }

  const editSupplier = (element) =>  {
    setSupplier(element);
    setShowForm(true);
    setTitle('Editar proveedor');
  }

  return (
    <>
    <div style={styles.container}>
      <div style={styles.headerContainer}>

        <h2 style={styles.title}>Proveedores</h2>
        <Button style={styles.newClientButton} onClick={() => (handleOpenModal())}>Nuevo proveedor</Button>
      </div>

      <hr />
      <div style={styles.tableContainer}>
        <GenericTable
          fields={fields}
          elements={suppliers}
          viewButton={false}
          editButton={true}
          editElement={editSupplier}
        />
      </div>
    </div>
    <NameForm
    show = {showForm}
    handleClose={handleCloseModal}
    title={title}
    type={'supplier'}
    editElement = {supplier}
    />
    </>

  );
};
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
}
export default Suppliers;