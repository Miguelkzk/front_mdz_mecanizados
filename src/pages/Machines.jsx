import { useEffect, useState } from "react";
import "../styles/clients&suppliers.css"
import { Button } from "react-bootstrap";
import { MachineService } from "../service/machine";
import GenericTable from "../components/GenericTable";
import { useNavigate } from "react-router-dom";

function Machines() {
  const fields = ['code', 'brand', 'model', 'horsepower' ];
  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();


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

  return (
    <div className="container">
      <div className="headerContainer">
      <h2 className="title">Máquinas</h2>
      <Button className="newButton">Nueva máquina</Button>
      </div>

        <hr />
        <div className="tableContainer">
          <GenericTable
            fields={fields}
            elements={machines}
            editButton={true}
            viewButton={true}
            viewElement={viewElement}
          />
        </div>
    </div>
  );
}

export default Machines;
