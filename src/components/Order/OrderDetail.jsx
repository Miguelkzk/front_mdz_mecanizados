import { Form, useLocation } from "react-router-dom";
import { OrderService } from "../../service/Order";
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from "react";
import { FaFileExcel, FaFilePdf, FaImage } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
import { Button, FormSelect } from "react-bootstrap";
import UploadForm from "../uploadForm";
import { DrawingsService } from "../../service/drawings";
import GenericTable from "../GenericTable";
import MaterialForm from "./MaterialForm";
import { CertificateOfMaterialsService } from "../../service/certificateOfMaterials";
import { SupplierNoteSerive } from "../../service/supplierNote";
import { DeliveryNoteService } from "../../service/deliveryNote";
import EditButton2 from "../Buttons/EditButton2";
import OrderForm from "./OrderForm";
import Notification from "../notification";
import ConfirmModal from "../ConfirmModal";
import DeleteButton2 from "../Buttons/DeleteButton2";
import ModalDelivery from "./modalDelivery";
import "../../styles/detailOrder.css"
import { PurchaseOrderService } from "../../service/purchaseOrderService";

function OrderDetail() {
  const location = useLocation();
  const { order } = location.state || {};
  const [detail, setDetail] = useState({});
  const [materialFormModal, setMaterialFormModal] = useState(false);
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setshowUploadModal] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [editOrder, setEditOrder] = useState('');
  const [fileType, setFileType] = useState('');
  const [delteFile, setDeleteFile] = useState({});
  const [selectedOrder, setSelectedOrder] = useState('');
  const [clientName, setClientName] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [newState, setNewState] = useState({});
  const [deleting, setDeleting] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [titleConfirmModal, setTitleConfirmModal] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [contentConfirmModal, setContentConfirmModal] = useState('');
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
    if (dateString == null) {
      return;
    }

    const date = new Date(dateString);
    date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
    return date.toLocaleDateString('es-ES', options);
  };

  const dateFormat = (dateString) => {
    if (dateString == null) {
      return;
    }

    const date = new Date(dateString);

    // Ajustar la fecha según la zona horaria local
    date.setHours(date.getHours() + date.getTimezoneOffset() / 60);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
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

      switch (fileType) {
        case 'drawing':
          await DrawingsService.newDrawing(formData);
          break;
        case 'certificate':
          await CertificateOfMaterialsService.newCertificate(formData)
          break;
        case 'supplierNote':
          await SupplierNoteSerive.newSupplierNote(formData)
          break;
        case 'deliveryNote':
          await DeliveryNoteService.upload(formData);
          break;
        case 'purchaseOrder':
          await PurchaseOrderService.upload(formData);
          break;
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
  const handleEditOrder = () => {
    setEditOrder({
      name: detail.name,
      purchase_order: detail.purchase_order,
      quantity: detail.quantity,
      ingresed_at: dateFormat(detail.ingresed_at),
      estimated_delivery_date: dateFormat(detail.estimated_delivery_date),
      unit_price: detail.unit_price,
      comment: detail.comment,
      currency: detail.currency,
      state: detail.state,
      client_id: detail.client_id
    })
    setSelectedOrder(detail.id);
    setClientName(detail.client);
    setShowOrderForm(true);
  }

  const handleCloseOrderForm = () => {
    setShowOrderForm(false)
    setEditOrder({
      name: '',
      purchase_order: '',
      quantity: '',
      ingresed_at: '',
      estimated_delivery_date: '',
      unit_price: '',
      comment: '',
      currency: '',
      state: '',
      client_id: '',
    })
    setSelectedOrder('');
    setClientName('');
    fetchOrder();
  }
  const handleChangeState = async (e) => {
    let stateValue = e.target.value;
    let newState = { state: stateValue };

    if (newState.state === 'delivered_and_invoiced') {
      setShowDeliveryModal(true);
      setNewState(newState);
    } else {
      await updateOrderState(newState);
    }
  }

  const updateOrderState = async (newState) => {
    try {
      await OrderService.editOrder(newState, detail.id);
      setNotification({ show: true, message: 'Estado actualizado correctamente.' });
      fetchOrder();
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
      setNotification({ show: true, message: 'Error al actualizar el estado.' });
    }
  }
  const handleCloseNotification = () => {
    setNotification({ show: false, message: '' });
  };

  const handleCloseConfirmModal = () => {
    setTitleConfirmModal('');
    setContentConfirmModal('');
    setShowConfirmModal(false);
    setFileType('');
    setDeleteFile({});
  }

  const handleConfirmModalGenearte = async () => {
    setDeleting(true);
    try {
      switch (fileType) {
        case 'drawing':
          await DrawingsService.delete(delteFile);
          break;
        case 'certificate':
          await CertificateOfMaterialsService.delete(delteFile);
          break;
        case 'supplierNote':
          await SupplierNoteSerive.deleteSupplierNote(delteFile);
          break;
        case 'deliveryNote':
          await DeliveryNoteService.delete(delteFile);
          break;
        case 'purchaseOrder':
          await PurchaseOrderService.delete(delteFile);
          break;
        case 'workOrder':
          generateWorkOrder();
          break;
      }
    } catch (error) {
      console.log(error)
    } finally {
      setDeleting(false);
    }
    handleCloseConfirmModal();
    fetchOrder();
  }

  const handleWorkOrder = () => {
    if (detail.work_order != null) {
      setShowConfirmModal(true)
      setTitleConfirmModal('¿Regenerar orden?')
      setFileType('workOrder')
      setContentConfirmModal('Al regenear una orden los cambios que haya realizado en la anterior se descartarán, ¿está seguro que desea continuar?')
    } else {
      generateWorkOrder()
    }
  }

  const handleDeleteFile = (element) => {
    setTitleConfirmModal('Confirmar eliminación')
    setContentConfirmModal(`¿Está seguro que desea eliminar el archivo ${element.name} ? `)
    setShowConfirmModal(true)
    setDeleteFile(element);
  }

  const handleCloseDeliveryModal = () => {
    setShowDeliveryModal(false)
  }

  const handleSaveDeliveryDate = () => {
    updateOrderState(newState);
    setNewState('')
  }

  const formatPrice = (mount) => {
    let mountFormatted;

    if (detail.currency === 'usd') {
      mountFormatted = `US$ ${new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(mount)}`;

      return mountFormatted;
    } else {
      mountFormatted = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(mount);
    }

    return mountFormatted;
  }


  const formatName = (name) => {
    const mid = Math.floor(name.length / 2);
    const start = name.slice(0, mid);
    const end = name.slice(mid);
    return start + ' ' + end;
  }


  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['pdf'].includes(extension)) {
      return <FaFilePdf className="icon" />;
    } else if (['png', 'jpg', 'jpeg'].includes(extension)) {
      return <FaImage style={styles.iconImage} />;
    } else {
      return <FaFilePdf className="icon" />; // Icono por defecto
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="materialsContainer">
          <h2 sclassName="title">Detalle de la Orden</h2>
          <div className="stateContainer">
            <div className="selectDiv">
              <div className="groupDiv">
                <label style={{ marginRight: '10px' }} >Cambiar de estado:</label>
                <FormSelect value={detail.state} onChange={handleChangeState} className="selectStyle">
                  <option value="without_material">Sin material</option>
                  <option value="with_material_but_not_started">Con material, pero no iniciado</option>
                  <option value="in_progress">En progreso</option>
                  <option value="not_invoiced">No facturado</option>
                  <option value="delivered_and_invoiced">Entregado y facturado</option>
                  <option value="incomplete">Incompleto</option>
                </FormSelect>
              </div>
              <EditButton2  onClick={handleEditOrder} />
            </div>
          </div>
          <Notification
            show={notification.show}
            message={notification.message}
            onClose={handleCloseNotification}
          />
          <div className="detailContainer">
            <DetailItem label="Cliente" value={detail.client} />
            <DetailItem label="Orden de compra" value={detail.purchase_order} />
            <DetailItem label="Nombre" value={detail.name} />
            <DetailItem label="Cantidad" value={detail.quantity} />
            <DetailItem label="Fecha de ingreso" value={formatDate(detail.ingresed_at)} />
            <DetailItem label="Fecha de entrega pactada" value={formatDate(detail.estimated_delivery_date)} />
            <DetailItem label="Fecha de entrega real" value={formatDate(detail.delivery_at)} />
            <DetailItem label="Precio unitario" value={formatPrice(detail.unit_price)} />
            <DetailItem label="Observaciones" value={detail.comment} />
            <DetailItem label="Precio total" value={formatPrice(detail.total_price)} />
            <DetailItem label="Moneda" value={detail.currency} />
            <DetailItem label="Estado" value={t(detail.state)} />
          </div>

          <div style={styles.drawingsContainer}>
            <div className="headerContainer">

              <h3 style={styles.sectionTitle}> Planos</h3>
              <Button className="newButton" onClick={() => { setFileType('drawing'); setshowUploadModal(true); }}>Agregar plano</Button>
            </div>

            {detail.drawings && detail.drawings.length > 0 && (
              detail.drawings.map((drawing) => (
                <div key={drawing.id} className="drawingItem">
                  <span>
                    {getFileIcon(drawing.name)}
                    <a href={drawing.view_url} target="_blank" rel="noopener noreferrer" className="drawingLink">
                      {formatName(drawing.name)}
                    </a>
                  </span>
                  <DeleteButton2 onClick={() => { setFileType('drawing'); handleDeleteFile(drawing) }} />
                </div>
              ))
            )}
          </div>
        </div>

        <div style={styles.materialsContainer}>
          <div className="headerContainer">
            <h3 style={styles.sectionTitle}>Materiales</h3>
            <Button className="newButton"onClick={() => setMaterialFormModal(true)}>Gestionar material</Button>
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
            <div className="headerContainer">
              <h3 style={styles.sectionTitle}>Orden de compra</h3>
              <Button className="newButton"onClick={() => { setFileType('purchaseOrder'); setshowUploadModal(true); }}>Cargar orden</Button>
            </div>
            {detail.file_purchase_orders && detail.file_purchase_orders.length > 0 && (
              detail.file_purchase_orders.map((purchase_order) => (
                <div key={purchase_order.id} style={styles.drawingItem}>
                  <span>
                    <FaFilePdf style={styles.icon} />
                    <a href={purchase_order.view_url} target="_blank" rel="noopener noreferrer" style={styles.drawingLink}>
                      {formatName(purchase_order.name)}
                    </a>
                  </span>
                  <DeleteButton2 onClick={() => { setFileType('purchaseOrder'); handleDeleteFile(purchase_order) }} />
                </div>
              ))
            )}
          </div>


          <div style={styles.drawingsContainer}>
            <hr />
            <div className="headerContainer">
              <h3 style={styles.sectionTitle}>Remitos del proveedor</h3>
              <Button className="newButton" onClick={() => { setFileType('supplierNote'); setshowUploadModal(true); }}>Cargar remito</Button>
            </div>

            {detail.supplier_delivery_notes && detail.supplier_delivery_notes.length > 0 && (
              detail.supplier_delivery_notes.map((supplier_note) => (
                <div key={supplier_note.id} style={styles.drawingItem}>
                  <span>
                      {getFileIcon(supplier_note.name)}
                    <a href={supplier_note.view_url} target="_blank" rel="noopener noreferrer" style={styles.drawingLink}>
                      {formatName(supplier_note.name)}
                    </a>
                  </span>
                  <DeleteButton2 onClick={() => { setFileType('supplierNote'); handleDeleteFile(supplier_note) }} />
                </div>
              ))
            )}
          </div>

          <div style={styles.drawingsContainer}>
            <hr />
            <div className="headerContainer">
              <h3 style={styles.sectionTitle}>Certificados</h3>
              <Button className="newButton" onClick={() => { setFileType('certificate'); setshowUploadModal(true); }}>Cargar certificado</Button>
            </div>

            {detail.certificate_of_materials && detail.certificate_of_materials.length > 0 && (
              detail.certificate_of_materials.map((certificate) => (
                <div key={certificate.id} style={styles.drawingItem}>
                  <span>
                    {getFileIcon(certificate.name)}
                    <a href={certificate.view_url} target="_blank" rel="noopener noreferrer" style={styles.drawingLink}>
                      {formatName(certificate.name)}
                    </a>
                  </span>
                  <DeleteButton2 onClick={() => { setFileType('certificate'); handleDeleteFile(certificate) }} />
                </div>
              ))
            )}
          </div>

          <div className="drawingsContainer">
            <hr />
            <div className="headerContainer">
              <h3  style={styles.sectionTitle}>Documentos de salida</h3>
              <Button className="newButton" onClick={() => { setFileType('deliveryNote'); setshowUploadModal(true); }}>Cargar remito</Button>
            </div>

            {detail.delivery_notes && detail.delivery_notes.length > 0 && (
              detail.delivery_notes.map((deliveryNote) => (
                <div key={deliveryNote.id} style={styles.drawingItem}>
                  <span>
                    {getFileIcon(deliveryNote.name)}
                    <a href={deliveryNote.view_url} target="_blank" rel="noopener noreferrer" style={styles.drawingLink}>
                      {formatName(deliveryNote.name)}
                    </a>
                  </span>
                  <DeleteButton2 onClick={() => { setFileType('deliveryNote'); handleDeleteFile(deliveryNote) }} />
                </div>
              ))
            )}
          </div>
          <div className="drawingsContainer">
            <hr />
            <div className="headerContainer">
              <h3 style={styles.sectionTitle} >Orden de trabajo</h3>
              <Button className="newButton" onClick={handleWorkOrder} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: "8px" }}></span>
                    <span>Generando</span>
                  </>
                ) : detail.work_order != null ? (
                  "Regenerar orden"
                ) : (

                  "Generar orden"
                )}
              </Button>

            </div>

            {detail.work_order != null && (
              <div style={styles.drawingItem}>
                <span>
                  <FaFileExcel style={styles.iconExcel} />
                  <a href={detail.work_order.view_url} target="_blank" rel="noopener noreferrer" style={styles.drawingLink}>
                    {detail.work_order.name}
                  </a>
                </span>
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

      <OrderForm
        show={showOrderForm}
        handleClose={handleCloseOrderForm}
        title={'Editar orden'}
        editOrder={editOrder}
        nameClient={clientName}
        orderSelected={selectedOrder}
      />

      <ConfirmModal
        show={showConfirmModal}
        title={titleConfirmModal}
        content={deleting ? 'Eliminando archivo...' : contentConfirmModal}
        onConfirm={handleConfirmModalGenearte}
        onCancel={handleCloseConfirmModal}
        deleting={deleting}
      />

      <ModalDelivery
        show={showDeliveryModal}
        handleClose={handleCloseDeliveryModal}
        handleSave={handleSaveDeliveryDate}
        order={detail} />
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
    maxWidth: "90%",
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
    marginRight: "10px",
    marginBottom: "2px",
  },
  value: {
    color: "#555",
  },
  drawingsContainer: {
    marginTop: "20px",
    marginBottom: '6%'
  },
  sectionTitle: {
    fontSize: "28px",
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
    justifyContent: "space-between",
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
