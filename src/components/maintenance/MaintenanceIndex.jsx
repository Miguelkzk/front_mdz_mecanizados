import { useLocation } from "react-router-dom";
import { MachineService } from "../../service/machine";
import { useEffect, useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";
import { FaFile, FaFilePdf } from "react-icons/fa";
import MaintenanceForm from "./MaintenanceForm";
import { useTranslation } from "react-i18next";
import '../../styles/Maintenance.css';
import { set } from "date-fns";


function MaintenanceIndex() {
  const location = useLocation();
  const { machine } = location.state || {};
  const [maintenances, setMaintenances] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [isUpload, setIsUpload] = useState(false);
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    name_cont: '',
    filter_by_issue_date_month: '',
    filter_by_issue_date_year: '',
    type_maintenance_eq: ''
  });




  const fetchMaintenance = async () => {
    const data = await MachineService.showMaintenances(machine.id, filters);
    setMaintenances(data);
  }

  useEffect(() => {
    fetchMaintenance();
  },[filters]);

  const handleCloseModal = () => {
    setShowModal(false);
    setIsUpload(false);
    fetchMaintenance();
  }


  const formatDate = (date) => {
    let month = date.split("-")[1];
    let year = date.split("-")[0];
    return `${month}/${year}`;
  }

  const handleSheet = () => {
    setTitleModal('Generar planilla');
    setShowModal(true);
  }

  const handleUpload = () => {
    setTitleModal('Subir archivo');
    setIsUpload(true);
    setShowModal(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="container">
        <div className="headerContainerMaintenance">
          <h2 className="titleMaintenance">Mantenimientos de la máquina {machine.code}</h2>
          <div className="buttonGroupMaintenance">
            <Button className="newButtonMaintenance" onClick={() => handleSheet()}>
              Generar planilla
            </Button>
            <Button onClick={() => handleUpload()}>Subir archivo</Button>
          </div>
        </div>
        <hr />
        <div className="headerGroup">
          <div className="ContainerGroup">
            <div className="ContainerFilter">
              <label>Filtrar por archivo:</label>
              <Form.Control type="text" placeholder="Nombre del archivo" value={filters.name_cont} name="name_cont" onChange = {handleChange} />
            </div>

            <div className="ContainerFilter">
              <label>Filtrar por mes</label>
              <Form.Select
                    value={filters.filter_by_issue_date_month}
                    onChange={handleChange}
                    name="filter_by_issue_date_month"
                  >
                    <option value="">--Seleccionar mes--</option>
                    <option value="01">Enero</option>
                    <option value="02">Febrero</option>
                    <option value="03">Marzo</option>
                    <option value="04">Abril</option>
                    <option value="05">Mayo</option>
                    <option value="06">Junio</option>
                    <option value="07">Julio</option>
                    <option value="08">Agosto</option>
                    <option value="09">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                  </Form.Select>
            </div>

            <div className="ContainerFilter">
              <label>Filtrar por año</label>
              <Form.Control type="text" placeholder="aaaa" value={filters.filter_by_issue_date_year} name = "filter_by_issue_date_year" onChange={handleChange}/>
            </div>

            <div className="ContainerFilter">
              <label>Filtrar por tipo</label>
              <Form.Select value={filters.type_maintenance_eq} name="type_maintenance_eq" onChange={handleChange}>
                <option value="">Todos los tipos</option>
                <option value="0">Preventivo</option>
                <option value="1">Correctivo</option>
                <option value="2">Rutina</option>
              </Form.Select>
            </div>
          </div>
        </div>

        <hr />

        <div className="tableContainer">
          <Table className="text-center">
            <thead>
              <tr>
                <th>Archivo</th>
                <th>Fecha</th>
                <th>Tipo mantenimiento</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {maintenances.map((maintenance) => (
                <tr key={maintenance.id}>
                  <td>
                    <span>
                      <FaFilePdf style={{ color: "red", marginRight: "10px" }} />
                      <a href={maintenance.view_url} target="_blank" rel="noopener noreferrer">
                        {maintenance.name}
                      </a>
                    </span>
                  </td>
                  <td>{formatDate(maintenance.issue_date)}</td>
                  <td>{t(maintenance.type_maintenance)}</td>
                  <td>
                    <EditButton />
                  </td>
                  <td>
                    <DeleteButton />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <MaintenanceForm
        show={showModal}
        handleClose={handleCloseModal}
        machine={machine}
        title={titleModal}
        isUpload={isUpload}
      />
    </>
  );

} export default MaintenanceIndex;