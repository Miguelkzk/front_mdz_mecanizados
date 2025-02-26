import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { SupplierService } from "../../service/Supplier";
import AssessmentForm from "./AssessmentForm";
import DeleteButton2 from "../Buttons/DeleteButton2";
import EditButton2 from "../Buttons/EditButton2";
import EditButton from "../Buttons/EditButton";
import DeleteButton from "../Buttons/DeleteButton";
import ConfirmModal from "../ConfirmModal";
import { assessmentService } from "../../service/assessments";

function Assessments() {
  const location = useLocation();
  const { supplier } = location.state || {};
  const [notes, setNotes] = useState([]);
  const [assessment, setAssessment] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const fetchNotes = async () => {
    const data = await SupplierService.getNotes(supplier.id);
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const [year, month, day] = date.toISOString().split("T")[0].split("-");

    return `${day}/${month}/${year}`;
  };



  const handleCloseForm = () => {
    setShowForm(false);
    fetchNotes();
  }

  const handleCloseConfirmModal = () => {
    setShowDeleteModal(false);
  }

  const handleConfirmDelete = async () => {
    await assessmentService.deleteAssessment(assessment.id);
    fetchNotes();
    setShowDeleteModal(false);
  }
  const handleDelete = (assessment) => {
    setAssessment(assessment);
    setShowDeleteModal(true);
  }

  const handleEdit = (assessment) => {
    setAssessment(assessment);
    setShowForm(true);
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Evaluaciones de {supplier.name}</h3>
      <Button className="newButton" onClick={() => setShowForm(true)} >Nueva evaluación</Button>

      {/* Promedio de Evaluaciones */}
      <div className="mb-4 p-3 shadow-sm rounded bg-light">
        <h4 className="text text-center mb-3">Promedio de Evaluaciones</h4>
        <Table bordered hover className="text-center">
          <thead className="table-dark">
            <tr>
              <th>Aspecto</th>
              <th>Calificación</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Calidad del Producto y/o Servicio</td>
              <td>{notes.average_quality_note}</td>
            </tr>
            <tr>
              <td>Precio acorde a plaza</td>
              <td>{notes.average_cost_note}</td>
            </tr>
            <tr>
              <td>Tiempo de entrega</td>
              <td>{notes.average_delivery_note}</td>
            </tr>
            <tr>
              <td>Soporte Técnico</td>
              <td>{notes.average_service_note}</td>
            </tr>
            <tr>
              <td>Formas de Pago</td>
              <td>{notes.average_methods_of_payment_note}</td>
            </tr>
            <tr className="table-secondary">
              <td><strong>Calificación final</strong></td>
              <td><strong>{notes.total_note}</strong></td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Detalle de Evaluaciones */}
      <h4 className="text text-center mb-3">Detalle de Evaluaciones</h4>
      <h5 className="text-center" style={{color:'red'}}>Las evaluaciones tienen una validez de 12 meses </h5>
      {notes.evaluations && notes.evaluations.length > 0 ? (
        notes.evaluations.map((note, index) => (
          <div key={index} className="mb-4 p-3 shadow-sm rounded bg-white">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="text-muted"><strong>Fecha:</strong> {formatDate(note.assessed_at)}</p>
              <span>
                <EditButton onClick={()=> handleEdit(note)}/>
                <DeleteButton onClick={()=> handleDelete(note)}  />
              </span>
            </div>
            <Table bordered hover className="text-center">
              <thead className="table-dark">
                <tr>
                  <th>Aspecto</th>
                  <th>Calificación</th>
                  <th>Ponderación</th>
                  <th>Punt. Ponderado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Calidad del Producto</td>
                  <td>{note.quality_note}</td>
                  <td>{note.ponderation_quality}</td>
                  <td>{note.quality_note * note.ponderation_quality}</td>
                </tr>
                <tr>
                  <td>Precio acorde a plaza</td>
                  <td>{note.cost_note}</td>
                  <td>{note.ponderation_cost}</td>
                  <td>{note.cost_note * note.ponderation_cost}</td>
                </tr>
                <tr>
                  <td>Tiempo de entrega</td>
                  <td>{note.delivery_note}</td>
                  <td>{note.ponderation_delivery}</td>
                  <td>{note.delivery_note * note.ponderation_delivery}</td>
                </tr>
                <tr>
                  <td>Soporte Técnico</td>
                  <td>{note.service_note}</td>
                  <td>{note.ponderation_service}</td>
                  <td>{note.service_note * note.ponderation_service}</td>
                </tr>
                <tr>
                  <td>Formas de Pago</td>
                  <td>{note.methods_of_payment_note}</td>
                  <td>{note.ponderation_methods_of_payment}</td>
                  <td>{note.methods_of_payment_note * note.ponderation_methods_of_payment}</td>
                </tr>
                <tr className="table-secondary">
                  <td><strong>Calificación final</strong></td>
                  <td colSpan="2"></td>
                  <td><strong>{note.total_note}</strong></td>
                </tr>
              </tbody>
            </Table>
          </div>
        ))
      ) : (
        <p className="text-center text-muted">No hay evaluaciones disponibles.</p>
      )}

      <AssessmentForm
        show={showForm}
        handleClose={handleCloseForm}
        title="Nueva Evaluación"
        supplier={supplier}
        assessment={assessment}
      />

      <ConfirmModal
        show={showDeleteModal}
        handleClose={handleCloseConfirmModal}
        title={'Confirmar eliminación'}
        content={`¿Seguro que desea eliminar la evaluación con fecha ${ formatDate(assessment.assessed_at)} ` }
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseConfirmModal}

      />
    </div>
  );
}

export default Assessments;
