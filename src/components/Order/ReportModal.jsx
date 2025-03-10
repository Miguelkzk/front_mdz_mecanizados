import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { OrderService } from "../../service/Order";

function ReportModal ({show, handleClose}) {
  const [year, setYear] = useState('');

  const handleYearChange = (e) => setYear(e.target.value);


  const handleCloseModal = () => {
    setYear('');
    handleClose();
  }


  const handleGenerate = async () => {
    await OrderService.generateReport(year);
  }
  return(
    <>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reporte de producción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Año</Form.Label>
              <Form.Control
                type="number"
                placeholder="Vacío para todos los años"
                value={year}
                onChange={handleYearChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button onClick={handleGenerate} >Generar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
} export default ReportModal;