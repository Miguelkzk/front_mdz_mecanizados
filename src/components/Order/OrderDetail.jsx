import { useLocation } from "react-router-dom";
import { OrderService } from "../../service/Order";
import { useEffect, useState } from "react";
import { FaFilePdf } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
import { format } from 'date-fns';
import { Button } from "react-bootstrap";
import UploadForm from "../uploadForm";
import { DrawingsService } from "../../service/drawings";


function OrderDetail() {
  const location = useLocation();
  const { order } = location.state || {};
  const [detail, setDetail] = useState({});
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setshowUploadModal] = useState(false)

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const data = await OrderService.getOder(order);
    console.log(detail)
    setDetail(data);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  const handleCloseUploadModal = ()=>{
    setshowUploadModal(false)
    fetchOrder();
  }

  const uploadFile = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("order_id", detail.id);
    formData.append("parent_id", detail.drive_id);

    try {
      setIsUploading(true);
      await DrawingsService.newDrawing(formData);
    } catch (error) {
      console.error("Error subiendo el archivo:", error);
    } finally {
      setIsUploading(false);
      handleCloseUploadModal();
    }
  };


  return (
    <>

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
          <div style={styles.HeaderContainer}>
          <h3 style={styles.sectionTitle}>Planos</h3>
          <Button style={styles.newDrawButton} onClick={()=> setshowUploadModal(true)}>Agregar plano</Button>
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
      <UploadForm
      show={showUploadModal}
      handleClose={handleCloseUploadModal}
      handleSubmit= {uploadFile}
      isUploading={isUploading}/>
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
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
    color: "#777",
  },
  drawingsContainer: {
    marginTop: "20px",
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
  drawingLink: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
  HeaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexWrap: 'wrap',
  },
  newDrawButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginBottom: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    flex: "1 1 100%"
  }
};

export default OrderDetail;
