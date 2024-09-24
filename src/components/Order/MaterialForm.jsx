import { useEffect, useState } from "react";
import { Button, Form, FormControl, Modal, ModalBody } from "react-bootstrap";
import { SupplierService } from "../../service/Supplier";
import { MaterialService } from "../../service/material";
import { OrderService } from "../../service/Order";
import GenericTable from "../GenericTable";
import ConfirmModal from "../ConfirmModal";
import NameForm from "../Name.form";

function MaterialForm({ show, handleClose, orderID }) {
  const [errors, setErrors] = useState({});
  const [supplierName, setSupplierName] = useState('');
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [isEdit, setIsEdit] = useState(false)
  const [materialId, setMaterialId] = useState('');
  const [materialName, setMaterialName] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSupplierForm, setShowSupllierForm] = useState(false);
  const [material, setMaterial] = useState({
    description: '',
    quantity: '',
    supplier_note: '',
    ingresed_at: '',
    order_id: '',
    supplier_id: '',
  });

  const fields = [
    'description',
    'quantity',
    'supplier_name',
    'ingresed_at',
    'supplier_note'
  ];

  const handleCloseModal = () => {
    handleClose();
    clearForm();

  };

  const clearForm = () => {
    setMaterial({
      description: '',
      quantity: '',
      supplier_note: '',
      ingresed_at: '',
      order_id: '',
      supplier_id: '',
    })
    setFilteredSuppliers([]);
    setSupplierName('');
    setIsEdit(false);
    setMaterialId('');
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prevMaterial) => ({
      ...prevMaterial,
      [name]: value
    }));
  };

  const handleSupplierSelect = (supplier) => {
    setSupplierName(supplier.name);
    setMaterial((prevMaterial) => ({
      ...prevMaterial,
      supplier_id: supplier.id,
      order_id: orderID
    }));

    // setTimeout para asegurar que procese el cambio
    setTimeout(() => {
      setFilteredSuppliers([]);
    }, 100);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!material.description) formErrors.description = "La descripción es requerida";
    if (!material.supplier_note) formErrors.description = "El remito es requerido";
    if (!material.quantity || material.quantity <= 0) formErrors.quantity = "La cantidad debe ser mayor que 0";
    if (!material.ingresed_at) formErrors.ingresed_at = "La fecha de ingreso es requerida";
    if (!material.supplier_id) formErrors.supplier_id = "Debe seleccionar un proveedor";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  useEffect(() => {
    if (supplierName.length > 0) {
      fetchSuppliers();
    } else {
      setFilteredSuppliers([]);
    }
  }, [supplierName]);

  const fetchSuppliers = async () => {
    const callSuppliers = await SupplierService.getSuppliers(supplierName);
    setFilteredSuppliers(callSuppliers);
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        if (isEdit == true) {
          await MaterialService.editMaterial(material, materialId)
        } else {
          await MaterialService.newMaterial(material)
        }
        fetchMaterials();
        clearForm();
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (orderID) {
      fetchMaterials();
    }
  }, [orderID]);

  const fetchMaterials = async () => {
    try {
      if (orderID) {
        const materialsData = await OrderService.getMaterials(orderID);
        setMaterials(materialsData);
      }
    } catch (error) {
      console.log("Error fetching materials:", error);
    }
  };

  const editMaterial = (element) => {
    setMaterialId(element.id);
    let ingresed_DMA = element.ingresed_at;
    const [day, month, year] = ingresed_DMA.split('/');
    const ingresed_at_AMD = `${year}-${month}-${day}`;
    setMaterial({
      description: element.description,
      quantity: element.quantity,
      supplier_note: element.supplier_note,
      ingresed_at: ingresed_at_AMD,
      order_id: element.order_id,
      supplier_id: element.supplier_id,
    });

    setTimeout(() => {
      setFilteredSuppliers([]);
    }, 100);

    setSupplierName(element.supplier_name);
    setIsEdit(true);
  };

  const deleteMaterial = (element) => {
    setMaterialId(element.id)
    setMaterialName(element.description)
    setShowDeleteModal(true)

  }

  const handleCloseConfirmModal = () => {
    setShowDeleteModal(false)
    setMaterialId('')
    setMaterialName('')
  }

  const handleConfirmDelete = async () => {
    try {
      await MaterialService.deleteMaterial(materialId);
      fetchMaterials();
      handleCloseConfirmModal();
    } catch (error) {
      console.log(error)
    }
  }

  const handleCloseSupplerModal = () => {
    setShowSupllierForm(false);
  }

  return (
    <>
    <Modal show={show} onHide={handleCloseModal} className="modal-lg">
      <Modal.Header closeButton className="text-center">
        <Modal.Title style={{ textAlign: 'center', width: '100%' }}>Ingreso de material</Modal.Title>
      </Modal.Header>
      <ModalBody>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flex: 1, paddingRight: '20px', borderRight: '1px solid #ddd' }}>
            <Form>
              <Form.Group className="mt-2">
                <Form.Label>Proveedor</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Ingrese el nombre del proveedor"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  isInvalid={!!errors.supplier_id}
                />
                {errors.supplier_id && <Form.Text className="text-danger">{errors.supplier_id}</Form.Text>}

                {filteredSuppliers.length > 0 && (
                  <ul style={{ maxHeight: '150px', overflowY: 'auto', backgroundColor: 'white', border: '1px solid #ced4da' }}>
                    {filteredSuppliers.map((supplier) => (
                      <li
                        key={supplier.id}
                        style={{ padding: '5px', cursor: 'pointer' }}
                        onClick={() => handleSupplierSelect(supplier)}
                      >
                        {supplier.name}
                      </li>
                    ))}
                  </ul>
                )}
              </Form.Group>
              <a
                role="button"
                onClick={()=> setShowSupllierForm(true)}
                style={{
                  textDecoration: 'underline',
                  color: '#007bff',
                  cursor: 'pointer',
                }}
              >
                ¿Nuevo proveedor?
              </a>


              <Form.Group className="mt-2">
                <Form.Label>Descripcion</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Ingrese la descripción del material"
                  name="description"
                  value={material.description}
                  onChange={handleInputChange}
                  isInvalid={!!errors.description}
                />
                {errors.description && <Form.Text className="text-danger">{errors.description}</Form.Text>}
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Cantidad</Form.Label>
                <FormControl
                  type="number"
                  placeholder="Ingrese la cantidad del material"
                  name="quantity"
                  value={material.quantity}
                  onChange={handleInputChange}
                  isInvalid={!!errors.quantity}
                  min="0"
                />
                {errors.quantity && <Form.Text className="text-danger">{errors.quantity}</Form.Text>}
              </Form.Group>
            </Form>
          </div>
          <div style={{ flex: 1, paddingLeft: '20px' }}>
            <Form>
              <Form.Group className="mt-2">
                <Form.Label>Remito del proveedor</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Ingrese el n­úmero de remito"
                  name="supplier_note"
                  value={material.supplier_note}
                  onChange={handleInputChange}
                  isInvalid={!!errors.description}
                />
                {errors.description && <Form.Text className="text-danger">{errors.description}</Form.Text>}
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Fecha de ingreso</Form.Label>
                <Form.Control
                  type="date"
                  name="ingresed_at"
                  value={material.ingresed_at}
                  onChange={handleInputChange}
                  isInvalid={!!errors.ingresed_at}
                />
                {errors.ingresed_at && <Form.Text className="text-danger">{errors.ingresed_at}</Form.Text>}
              </Form.Group>
            </Form>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
          <Button onClick={handleSave}>Guardar material</Button>
        </div>
        <hr />
        <GenericTable
          fields={fields}
          elements={materials}
          editButton={true}
          deleteButton={true}
          editElement={editMaterial}
          deleteElement={deleteMaterial}
        />

        <ConfirmModal
          show={showDeleteModal}
          handleClose={handleCloseConfirmModal}
          title={'Confirmar eliminación'}
          content={`¿Seguro que desea eliminar el material ${materialName} ?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseConfirmModal}

        />
    <NameForm
    show = {showSupplierForm}
    handleClose={handleCloseSupplerModal}
    title={'Nuevo proveedor'}
    type={'supplier'}
    />
      </ModalBody>
    </Modal>

    </>

  );
}

export default MaterialForm;
