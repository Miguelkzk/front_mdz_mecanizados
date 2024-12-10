import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import Notification from "./notification";
import { RemunerationService } from "../service/remuneration";

function DateModal({ show, handleClose, date }) {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [errors,setErrors] = useState({});
  const [notification, setNotification] = useState({show: false, message: ''});
  const handleModalClose = () => {
    handleClose();
    setSelectedMonth("");
    setErrors({});

  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };


  const handleGenerate = async () => {


    if (validateForm()){
      let year = date.split("-")[0];
      let month = `${year}-${selectedMonth}`
      let bodyRequest ={
        month: month
      }
      console.log(bodyRequest);
      await RemunerationService.create(bodyRequest);
      handleModalClose();
      setNotification({ show: true, message: 'Se ha creado un nuevo detalle' });
    }
    else {
      console.log("Error al crear el detalle");
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!selectedMonth) {
      errors.month = "El mes es requerido";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  return (
    <>
      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generar un registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label style={{width: '100%'}}>
                <Form.Select
                  name="month"
                  value={selectedMonth}
                  onChange={handleMonthChange}
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleGenerate}>
            Generar
          </Button>
        </Modal.Footer>
      </Modal>
      <Notification
        show={notification.show}
        message={notification.message}
        onClose={() => setNotification({show: false, message: ''})}
      />
    </>
  );
}

export default DateModal;
