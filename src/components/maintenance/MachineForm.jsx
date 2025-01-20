import { useEffect, useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { MachineService } from "../../service/machine";
import Notification from "../notification";

function MachineForm({ title, show, handleClose, editMachine, isEdit }) {
  const [machine, setMachine] = useState({
    code: '',
    brand: '',
    model: '',
    horsepower: '',
    routine_detail: '',
    preventive_detail_annual: '',
    preventive_detail_biannual: '',
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ show: false, message: '' });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMachine((prevMachine) => ({
      ...prevMachine,
      [name]: value
    }));
  };

  const handleCloseModal = () => {
    setMachine({
      code: '',
      brand: '',
      model: '',
      horsepower: '',
      routine_detail: '',
      preventive_detail_annual: '',
      preventive_detail_biannual: '',
    });
    setErrors({});
    handleClose();
  }

  const handleCloseNotification = () => {
    setNotification({ show: false, message: '' });
  };


  const validateForm = () => {
    let formErrors = {};
    if (!machine.code) formErrors.code = "El código es requerido";
    if (!machine.brand) formErrors.brand = "La marca es requerida";
    if (!machine.model) formErrors.model = "El modelo es requerido";
    if (!machine.horsepower) formErrors.horsepower = "La potencia es requerida";
    if (machine.horsepower < 0 ) formErrors.horsepower = "La potencia no puede ser negativa";
    if (!machine.routine_detail) formErrors.routine_detail = "El detalle preventivo rutinario es requerido";
    if (!machine.preventive_detail_biannual) formErrors.preventive_detail_biannual = "El detalle preventivo semestral/trimestral es requerido";
    if (!machine.preventive_detail_annual) formErrors.preventive_detail_annual = "El detalle preventivo anual es requerido";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;


  }


  const handleSaveForm = async () => {
    if (validateForm()) {
      if (isEdit) {
        try {
          await MachineService.editMachine(editMachine.id, machine);
          setNotification({ show: true, message: 'Máquina editada' });
          handleCloseModal();
        }
        catch (error) {
          console.error(error);
        }
      }
      else {
        try{
          await MachineService.newMachine(machine);
          setNotification({ show: true, message: 'Máquina creada' });
          handleCloseModal();
        }
        catch (error) {
          console.error(error);
        }
      }
    }
  }

  useEffect(() => {
    if (isEdit) {
      setMachine({
        code: editMachine.code,
        brand: editMachine.brand,
        model: editMachine.model,
        horsepower: editMachine.horsepower,
        routine_detail: editMachine.routine_detail,
        preventive_detail_annual: editMachine.preventive_detail_annual,
        preventive_detail_biannual: editMachine.preventive_detail_biannual,
      });
    }
  }, [isEdit]);


  return (
    <>
      <Modal show={show} onHide={handleCloseModal} className="modal-xl">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flex: 1, paddingRight: '20px', borderRight: '1px solid #ddd' }}>


              <Form>
                <Form.Group className="mt-2">
                  <Form.Label>Código</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Ingrese el código de la máquina"
                    name="code"
                    value={machine.code}
                    onChange={handleInputChange}
                    isInvalid={!!errors.code}
                  />
                  {errors.code && <Form.Text className="text-danger">{errors.code}</Form.Text>}
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label>Marca</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Ingrese la marca de la máquina"
                    name="brand"
                    value={machine.brand}
                    onChange={handleInputChange}
                    isInvalid={!!errors.brand}
                  />
                  {errors.brand && <Form.Text className="text-danger">{errors.brand}</Form.Text>}
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label>Modelo</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Ingrese el modelo de la máquina"
                    name="model"
                    value={machine.model}
                    onChange={handleInputChange}
                    isInvalid={!!errors.model}
                  />
                  {errors.model && <Form.Text className="text-danger">{errors.model}</Form.Text>}
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label>Potencia</Form.Label>
                  <FormControl
                    type="number"
                    placeholder="Ingrese la potencia de la máquina"
                    name="horsepower"
                    value={machine.horsepower}
                    onChange={handleInputChange}
                    isInvalid={!!errors.horsepower}
                  />
                  {errors.horsepower && <Form.Text className="text-danger">{errors.horsepower}</Form.Text>}
                </Form.Group>
              </Form>
            </div>
            <div style={{ flex: 1, paddingLeft: '20px' }}>
              <Form>
                <Form.Group className="mt-2">
                  <Form.Label>Detalle preventivo rutinario</Form.Label>
                  <FormControl
                    type="text"
                    as="textarea"
                    rows={4}
                    placeholder="Ingrese el detalle de mantenimiento"
                    name="routine_detail"
                    value={machine.routine_detail}
                    onChange={handleInputChange}
                    isInvalid={!!errors.routine_detail}
                  />
                  {errors.routine_detail && <Form.Text className="text-danger">{errors.routine_detail}</Form.Text>}
                </Form.Group>


                <Form.Group className="mt-2">
                  <Form.Label>Detalle preventivo semestral/trimestral</Form.Label>
                  <FormControl
                    type="text"
                    as="textarea"
                    rows={4}
                    placeholder="Ingrese el detalle de mantenimiento"
                    name="preventive_detail_biannual"
                    value={machine.preventive_detail_biannual}
                    onChange={handleInputChange}
                    isInvalid={!!errors.preventive_detail_biannual}
                  />
                  {errors.preventive_detail_biannual && <Form.Text className="text-danger">{errors.preventive_detail_biannual}</Form.Text>}
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label>Detalle preventivo anual</Form.Label>
                  <FormControl
                    type="text"
                    as="textarea"
                    rows={4}
                    placeholder="Ingrese el detalle de mantenimiento"
                    name="preventive_detail_annual"
                    value={machine.preventive_detail_annual}
                    onChange={handleInputChange}
                    isInvalid={!!errors.preventive_detail_annual}
                  />
                  {errors.preventive_detail_annual && <Form.Text className="text-danger">{errors.preventive_detail_annual}</Form.Text>}
                </Form.Group>

              </Form>
            </div>
          </div>

        </Modal.Body >
        <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveForm}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal >

      <Notification
        show={notification.show}
        message={notification.message}
        onClose={handleCloseNotification}
      />
    </>

  )
} export default MachineForm;