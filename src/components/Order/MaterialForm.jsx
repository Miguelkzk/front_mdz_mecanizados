import { useEffect, useState } from "react";
import { Button, Form, FormControl, Modal, ModalBody } from "react-bootstrap";
import { SupplierService } from "../../service/Supplier";
import { MaterialService } from "../../service/material";

function MaterialForm({ show, handleClose, orderID }) {
  const [errors, setErrors] = useState({});
  const [supplierName, setSupplierName] = useState('');
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [material, setMaterial] = useState({
    description: '',
    quantity: '',
    ingresed_at: '',
    order_id: '',
    supplier_id: ''
  });

  const handleCloseModal = () => {
    handleClose();
    setMaterial({
      description: '',
      quantity: '',
      ingresed_at: '',
      order_id: '',
      supplier_id: ''
    })
    setFilteredSuppliers([]);
    setSupplierName('');
  };

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
    if (!material.description) formErrors.description = "La descripcion es requerida";
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
    setFilteredSuppliers(callSuppliers); // Filtra la lista conforme el usuario escribe
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        console.log(material)
        await MaterialService.newMaterial(material)
        handleCloseModal();
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton className="text-center">
        <Modal.Title style={{ textAlign: 'center', width: '100%' }}>Ingreso de material</Modal.Title>
      </Modal.Header>
      <ModalBody>
        <Form>
          <Form.Group className="mt-2">
            <Form.Label>Descripcion</Form.Label>
            <FormControl
              type="text"
              placeholder="Ingrese la descripcion"
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
              placeholder="Ingrese la cantidad"
              name="quantity"
              suppliervalue={material.quantity}
              onChange={handleInputChange}
              isInvalid={!!errors.quantity}
            />
            {errors.quantity && <Form.Text className="text-danger">{errors.quantity}</Form.Text>}
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
              <ul style={{ maxHeight: '150px', overflowY: 'auto', backgroundColor: 'white', border: '1px solid #ced4da', }}>
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
        </Form>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
          <Button onClick={handleSave}>Agregar material</Button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default MaterialForm;
