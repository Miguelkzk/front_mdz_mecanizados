import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap"
import { MachineService } from "../../service/machine";
import { set } from "date-fns";
import '../../styles/Maintenance.css';

function MaintenanceForm({ show, handleClose, machine, title, isUpload }) {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [year, setYear] = useState("");
  const [typeMaintenance, setTypeMaintenance] = useState("");
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selection, setSelection] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCloseModal = () => {
    clearForm();
    handleClose();
  }

  const clearForm = () => {
    setSelectedMonth("");
    setYear("");
    setTypeMaintenance("");
    setErrors({});
    setSelection(false);
  }

  const handleSave = async () => {
    if (validateForm()) {
      if (isUpload) {
        await uploadFile();
      } else {
        await saveMaintenance();
      }
    }
  }
  const uploadFile = async () => {
    if (file) {
      setIsUploading(true);
      const issue_date = `${year}-${selectedMonth}-01`;
      await MachineService.UploadFile(machine.id, file, issue_date, machine.drive_id, typeMaintenance)
      setIsUploading(false);
      clearForm();
      handleClose();
    }
  }

  const saveMaintenance = async () => {
    try {
      await MachineService.generateSheet(machine.id, selectedMonth, year, typeMaintenance,selection );
    } catch (error) {
      console.log(error);
    }
  }

  const validateForm = () => {
    let errors = {};
    if (!typeMaintenance) { errors.typeMaintenance = "El tipo de mantenimiento es requerido"; }
    if (typeMaintenance == 'corrective' && !isUpload) return true
    if (typeMaintenance == 'preventive' && !selection && !isUpload) { errors.selection = "Debe seleccionar un periodo"; }
    if (isUpload) {
      if (!file) { errors.file = "El archivo es requerido"; }
      if (!selectedMonth) { errors.month = "El mes es requerido"; }
      if (!year || year <= 0) { errors.year = "El año debe ser mayor a 0"; }
      setErrors(errors);
      return Object.keys(errors).length === 0;
    }
    if (typeMaintenance === 'routine' && !isUpload) {
      if (!selectedMonth) { errors.month = "El mes es requerido"; }
      if (!year || year <= 0) { errors.year = "El año debe ser mayor a 0"; }
      setErrors(errors);
      return Object.keys(errors).length === 0;
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleChangeCheckbox = (option) => {
    setSelection(selection === option ? null : option);
  }

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label style={{ width: '100%' }}> Tipo de mantenimiento </Form.Label>
            <Form.Select
              value={typeMaintenance}
              onChange={(e) => setTypeMaintenance(e.target.value)}
              isInvalid={!!errors.month}
            >
              <option value="">--Seleccionar tipo--</option>
              <option value="routine">Rutina</option>
              <option value="preventive">Preventivo</option>
              <option value="corrective">Correctivo</option>
            </Form.Select>
            {errors.typeMaintenance && <Form.Text className="text-danger">{errors.typeMaintenance}</Form.Text>}
          </Form.Group>
          {(typeMaintenance === 'routine' || isUpload) &&
            <>
              <Form.Group className="mt-2">
                <Form.Label style={{ width: '100%' }}> Mes
                  <Form.Select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    isInvalid={!!errors.month}
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
                  {errors.month && <Form.Text className="text-danger">{errors.month}</Form.Text>}
                </Form.Label>
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label> Año </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese el Año"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  min={0}
                  isInvalid={!!errors.year}
                />
                {errors.year && <Form.Text className="text-danger">{errors.year}</Form.Text>}
              </Form.Group>
            </>}

          {((typeMaintenance === 'preventive') && (!isUpload)) &&
            <>
              <p className="mt-2">Seleccione el periodo</p>
              <div className="periodDiv">

                <label >
                  Trimestral
                  <input
                    type="checkbox"
                    checked={selection === 'quarterly'}
                    onChange={() => handleChangeCheckbox('quarterly')}
                    className="ms-2"
                  ></input>
                </label>

                <label >
                  Semestral
                  <input
                    type="checkbox"
                    checked={selection === 'biannual'}
                    onChange={() => handleChangeCheckbox('biannual')}
                    className="ms-2"
                  ></input>
                </label>


                <label >
                  Anual
                  <input
                    type="checkbox"
                    checked={selection === 'annual'}
                    onChange={() => handleChangeCheckbox('annual')}
                    className="ms-2"

                  ></input>
                </label>
              </div>
              {errors.selection && <Form.Text className="text-danger">{errors.selection}</Form.Text>}
            </>
          }


          {isUpload && (
            <>
              <Form.Group className="mt-2">
                <Form.Label>Archivo</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
            </>
          )}

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3%', width: '100%' }}>
          <Button onClick={handleSave}>
            {isUploading ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  style={{ marginRight: '5px' }}
                />{" "}
                Subiendo...
              </>
            ) : (
              "Confirmar"
            )}
          </Button>
        </div>

      </Modal.Footer>
    </Modal>
  )
}
export default MaintenanceForm;