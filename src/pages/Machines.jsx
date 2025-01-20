import { useEffect, useState } from "react";
import "../styles/clients&suppliers.css"
import { Button } from "react-bootstrap";
import { MachineService } from "../service/machine";
import GenericTable from "../components/GenericTable";
import { useNavigate } from "react-router-dom";
import MachineForm from "../components/maintenance/MachineForm";

function Machines() {
  const fields = ['code', 'brand', 'model', 'horsepower', 'routine_detail', 'preventive_detail_biannual', 'preventive_detail_annual'];
  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [show, setShow] = useState(false);
  const [editMachine, setEditMachine] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const fetchMachines = async () => {
    const data = await MachineService.getMachines();
    setMachines(data);
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const viewElement = (element) => {
    navigate('/machine-detail', { state: { machine: element } });
  };

  const handleCloseModal = () => {
    setShow(false);
    setIsEdit(false);
    fetchMachines();
  }

  const newMachine = () => {
    setTitle('Nueva máquina');
    setShow(true);
  }

  const handleEditMachine = (machine) => {
    setEditMachine(machine);
    setIsEdit(true);
    setTitle('Editar máquina');
    setShow(true);
  }

  return (
    <>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)' }}>
        <div style={{ width: '95%' }}>
          <div className="headerContainer" style={{ marginTop: '2%' }}>
            <h2 className="title">Máquinas</h2>
            <Button className="newButton" onClick={newMachine}>Nueva máquina</Button>
          </div>

          <hr />
          <div className="tableContainer">
            <GenericTable
              fields={fields}
              elements={machines}
              editButton={true}
              viewButton={true}
              viewElement={viewElement}
              editElement={handleEditMachine}

            />
          </div>
        </div>
        <MachineForm
          title={title}
          show={show}
          handleClose={handleCloseModal}
          editMachine={editMachine}
          isEdit={isEdit}
        />

      </div>
    </>

  );
}

export default Machines;
