import { useLocation } from "react-router-dom";
import { OrderService } from "../../service/Order";
import { useEffect, useState } from "react";
import { FaFileExcel, FaFilePdf, FaImage } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import UploadForm from "../uploadForm";
import { DrawingsService } from "../../service/drawings";
import GenericTable from "../GenericTable";
import MaterialForm from "./MaterialForm";
import { CertificateOfMaterialsService } from "../../service/certificateOfMaterials";
import { SupplierNoteSerive } from "../../service/supplierNote";
import { DeliveryNoteService } from "../../service/deliveryNote";

function OrderDetail() {
  const location = useLocation();
  const { order } = location.state || {};
  const [detail, setDetail] = useState({});
  const [materialFormModal, setMaterialFormModal] = useState(false);
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setshowUploadModal] = useState(false);
  const [fileType, setFileType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const fields = [
    'description',
    'quantity',
    'supplier_name',
    'ingresed_at',
    'supplier_note'

  ];

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const data = await OrderService.getOder(order);
    setDetail(data);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const handleCloseUploadModal = () => {
    setshowUploadModal(false);
    fetchOrder();
    setFileType('')
  };

  const uploadFile = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("order_id", detail.id);
    formData.append("parent_id", detail.drive_id);
    try {
      setIsUploading(true);

      if (fileType === 'drawing') {
        await DrawingsService.newDrawing(formData);
      } else if (fileType === 'certificate') {
        await CertificateOfMaterialsService.newCertificate(formData)
      } else if (fileType === 'supplierNote') {
        await SupplierNoteSerive.newSupplierNote(formData)
      } else if (fileType === 'deliveryNote') {
        await DeliveryNoteService.upload(formData);
      }
    } catch (error) {
      console.error("Error subiendo el archivo:", error);
    } finally {
      setIsUploading(false);
      handleCloseUploadModal();
    }
  };

  const generateWorkOrder = async () => {
    try {
      setIsGenerating(true);
      await OrderService.generateWorkOrder(detail);
      fetchOrder();
    } catch (error) {
      console.log(error);
    } finally {
      setIsGenerating(false);
    }
  }
  const handleCloseMaterialModal = () => {
    setMaterialFormModal(false);
    fetchOrder();
  }
  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h2 style={styles.title}>Detalle de la Orden</h2>
          <div style={styles.detailContainer}>
            <DetailItem label="Cliente" value={detail.client} />
            <DetailItem label="Orden de compra" value={detail.purchase_order} />
            <DetailItem label="Nombre" value={detail.name} />
            <DetailItem label="Cantidad" value={detail.quantity} />
            <DetailItem label="Fecha de ingreso" value={formatDate(detail.ingresed_at)} />
            <DetailItem label="Fecha de entrega" value={formatDate(detail.delivery_at)} />
            <DetailItem label="Precio unitario" value={detail.unit_price} />
            <DetailItem label="Observaciones" value={detail.comment} />
            <DetailItem label="Precio total" value={detail.total_price} />
            <DetailItem label="Moneda" value={detail.currency} />
            <DetailItem label="Estado" value={t(detail.state)} />
          </div>

          <div style={styles.drawingsContainer}>
            <div style={styles.headerContainer}>

              <h3 style={styles.sectionTitle}>Planos</h3>
              <Button style={styles.newDrawButton} onClick={() => { setFileType('drawing'); setshowUploadModal(true); }}>Agregar plano</Button>
            </div>

            {detail.drawings && detail.drawings.length > 0 && (
              detail.drawings.map((drawing) => (
                <div key={drawing.id} style={styles.drawingItem}>
                  <FaFilePdf style={styles.icon} />
                  <a href={drawing.view_url} target="_blank" rel="noopener noreferrer" style={styles.drawingLink}>
                    {drawing.name}
                  </a>
                </div>
              ))
            )}
          </div>
        </div>

        <div style={styles.materialsContainer}>
          <div style={styles.headerContainer}>
            <h3 style={styles.sectionTitle}>Materiales</h3>
            <Button style={styles.newDrawButton} onClick={() => setMaterialFormModal(true)}>Agregar material</Button>
          </div>
          {detail.materials && detail.materials.length > 0 && (
            <GenericTable
              fields={fields}
              elements={detail.materials}
              viewButton={false}
            />
          )}
          <div style={styles.drawingsContainer}>
            <hr />
            <div style={styles.headerContainer}>
              <h3 style={styles.sectionTitle}>Remitos del proveedor</h3>
              <Button style={styles.newDrawButton} onClick={() => { setFileType('supplierNote'); setshowUploadModal(true); }}>Cargar remito</Button>
            </div>

            {detail.supplier_delivery_notes && detail.supplier_delivery_notes.length > 0 && (
              detail.supplier_delivery_notes.map((supplier_note) => (
                <div key={supplier_note.id} style={styles.drawingItem}>
                  <FaImage style={styles.iconImage} />
                  <a href={supplier_note.view_url} target="_blank" rel="noopener noreferrer" style={styles.drawingLink}>
                    {supplier_note.name}
                  </a>
                </div>
              ))
            )}
          </div>

          <div style={styles.drawingsContainer}>
            <hr />
            <div style={styles.headerContainer}>
              <h3 style={styles.sectionTitle}>Certificado de matetiales</h3>
              <Button style={styles.newDrawButton} onClick={() => { setFileType('certificate'); setshowUploadModal(true); }}>Cargar certificado</Button>
            </div>

            {detail.certificate_of_materials && detail.certificate_of_materials.length > 0 && (
              detail.certificate_of_materials.map((certificate) => (
                <div key={certificate.id} style={styles.drawingItem}>
                  <FaImage style={styles.iconImage} />
                  <a href={certificate.view_url} target="_blank" rel="noopener noreferrer" style={styles.drawingLink}>
                    {certificate.name}
                  </a>
                </div>
              ))
            )}
          </div>

          <div style={styles.drawingsContainer}>
            <hr />
            <div style={styles.headerContainer}>
              <h3 style={styles.sectionTitle}>Remitos de salida</h3>
              <Button style={styles.newDrawButton} onClick={() => { setFileType('deliveryNote'); setshowUploadModal(true); }}>Cargar remito</Button>
            </div>

            {detail.delivery_notes && detail.delivery_notes.length > 0 && (
              detail.delivery_notes.map((deliveryNote) => (
                <div key={deliveryNote.id} style={styles.drawingItem}>
                  <FaImage style={styles.iconImage} />
                  <a href={deliveryNote.view_url} target="_blank" rel="noopener noreferrer" style={styles.drawingLink}>
                    {deliveryNote.name}
                  </a>
                </div>
              ))
            )}
          </div>
          <div style={styles.drawingsContainer}>
            <hr />
            <div style={styles.headerContainer}>
              <h3 style={styles.sectionTitle}>Orden de trabajo</h3>
              <Button style={{ ...styles.newDrawButton, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={generateWorkOrder} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: "8px" }}></span>
                    <span>Generando</span>
                  </>
                ) : (
                  "Generar orden"
                )}
              </Button>

            </div>

            {detail.work_order != null && (
              <div style={styles.drawingItem}>
                <FaFileExcel style={styles.iconExcel} />
                <a href={detail.work_order.view_url} target="_blank" rel="noopener noreferrer" style={styles.drawingLink}>
                  {detail.work_order.name}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <UploadForm
        show={showUploadModal}
        handleClose={handleCloseUploadModal}
        handleSubmit={uploadFile}
        isUploading={isUploading}
      />

      <MaterialForm
        show={materialFormModal}
        handleClose={handleCloseMaterialModal}
        orderID={detail.id}
      />
    </>
  );
}

const DetailItem = ({ label, value }) => (
  <div style={styles.detailItem}>
    <span style={styles.label}>{label}:</span>
    <span style={styles.value}>{value}</span>
  </div>
);

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "80%",
    margin: "20px auto",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  materialsContainer: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontSize: "28px",
  },
  detailContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  detailItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    color: "#555",
  },
  drawingsContainer: {
    marginTop: "20px",
    marginBottom: '30px'
  },
  sectionTitle: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "10px",
  },
  drawingItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  icon: {
    marginRight: "10px",
    color: "#d32f2f",
  },
  iconExcel: {
    marginRight: "10px",
    color: "#22d319",
  },
  iconImage: {
    marginRight: "10px",
    color: "rgb(0, 123, 255)"
  },
  drawingLink: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  newDrawButton: {
    padding: "8px 20px",
    fontSize: "16px",
  },
};

export default OrderDetail;
