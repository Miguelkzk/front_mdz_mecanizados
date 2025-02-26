import { Alert, Button, Form, Modal, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { assessmentService } from "../../service/assessments";

function AssessmentForm({ show, handleClose, title, supplier, assessment }) {
  const formatDate = (date) => {
    if (!date) return "";
    return date.split("T")[0]; // Extrae solo la parte YYYY-MM-DD
  };

  const initialState = {
    quality_note: assessment?.quality_note || "",
    ponderation_quality: assessment?.ponderation_quality || "3",
    cost_note: assessment?.cost_note || "",
    ponderation_cost: assessment?.ponderation_cost || "2.5",
    delivery_note: assessment?.delivery_note || "",
    ponderation_delivery: assessment?.ponderation_delivery || "2",
    service_note: assessment?.service_note || "",
    ponderation_service: assessment?.ponderation_service || "1.5",
    methods_of_payment_note: assessment?.methods_of_payment_note || "",
    ponderation_methods_of_payment: assessment?.ponderation_methods_of_payment || "1",
    assessed_at: formatDate(assessment?.assessed_at) || "",
    supplier_id: supplier.id,
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [ponderationError, setPonderationError] = useState("");

  useEffect(() => {
    setForm(initialState);
  }, [assessment, supplier]);

  const handleCloseModal = () => {
    setForm(initialState);
    setErrors({});
    setPonderationError("");
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "assessed_at" ? formatDate(value) : value });
  };

  const handleSave = async () => {
    let newErrors = {};

    // Validación de campos vacíos
    Object.keys(form).forEach((key) => {
      if (!form[key]) newErrors[key] = "Campo requerido";
    });

    // Validación de ponderaciones
    const totalPonderation = Object.keys(form)
      .filter((key) => key.includes("ponderation_"))
      .reduce((acc, key) => acc + parseFloat(form[key] || 0), 0);

    if (totalPonderation !== 10) {
      setPonderationError("La suma de las ponderaciones debe ser exactamente 10.");
      return;
    } else {
      setPonderationError("");
    }

    // Validación de notas (deben estar entre 0 y 10)
    Object.keys(form)
      .filter((key) => key.includes("_note"))
      .forEach((key) => {
        const noteValue = parseFloat(form[key]);
        if (noteValue < 0 || noteValue > 10) {
          newErrors[key] = "La nota debe estar entre 0 y 10.";
        }
      });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (assessment) {
      await assessmentService.updateAssessment(assessment.id, form);
    } else {
      await assessmentService.newAssessment(form);
    }

    handleCloseModal();
  };

  return (
    <Modal show={show} onHide={handleCloseModal} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ponderationError && <Alert variant="danger">{ponderationError}</Alert>}
        <Form>
          <Form.Group>
            <Form.Label>Fecha de la evaluación</Form.Label>
            <Form.Control
              type="date"
              name="assessed_at"
              value={form.assessed_at}
              onChange={handleChange}
              isInvalid={!!errors.assessed_at}
            />
            <Form.Control.Feedback type="invalid">{errors.assessed_at}</Form.Control.Feedback>
          </Form.Group>

          <Table responsive borderless>
            <thead>
              <tr>
                <th>Aspecto</th>
                <th>Ponderación</th>
                <th>Calificación</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Calidad del Producto y/o Servicio", name: "quality" },
                { label: "Precio acorde a plaza", name: "cost" },
                { label: "Tiempo de entrega", name: "delivery" },
                { label: "Soporte Técnico", name: "service" },
                { label: "Formas de Pago", name: "methods_of_payment" },
              ].map((aspect, index) => (
                <tr key={index}>
                  <td>{aspect.label}</td>
                  <td>
                    <Form.Control
                      type="number"
                      name={`ponderation_${aspect.name}`}
                      value={form[`ponderation_${aspect.name}`]}
                      onChange={handleChange}
                      isInvalid={!!errors[`ponderation_${aspect.name}`]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors[`ponderation_${aspect.name}`]}
                    </Form.Control.Feedback>
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      name={`${aspect.name}_note`}
                      value={form[`${aspect.name}_note`]}
                      onChange={handleChange}
                      isInvalid={!!errors[`${aspect.name}_note`]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors[`${aspect.name}_note`]}
                    </Form.Control.Feedback>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Form>
        <div className="d-flex justify-content-center mt-3">
          <Button onClick={handleSave}>{assessment ? "Actualizar" : "Guardar"}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AssessmentForm;
