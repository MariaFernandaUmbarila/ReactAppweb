import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

function PopupForm({ open, onClose, onRegister, formData }) {
  const [studentData, setStudentData] = useState(formData || { nombre: '', apellido: '', correo: '' });
  const [errors, setErrors] = useState({ correo: '' });

  useEffect(() => {
    setStudentData(formData || { nombre: '', apellido: '', correo: '' });
  }, [formData]);

  const validateForm = () => {
    const newErrors = { ...errors };

    // Validar el campo 'correo'
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(studentData.correo)) {
      newErrors.correo = 'La dirección de correo electrónico no es válida';
    } else {
      newErrors.correo = '';
    }

    setErrors(newErrors);

    // Devolver true si no hay errores, lo que permite enviar el formulario
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Evita el envío del formulario por defecto

    if (validateForm()) {
      onRegister(studentData);
      onClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleFormSubmit}>
        <DialogTitle>Nuevo Estudiante</DialogTitle>
        <DialogContent>
          <TextField
            name="nombre"
            label="Nombre"
            fullWidth
            value={studentData.nombre}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="apellido"
            label="Apellido"
            fullWidth
            value={studentData.apellido}
            onChange={handleInputChange}
            required
          />
          <TextField
            name="correo"
            label="Correo"
            fullWidth
            value={studentData.correo}
            onChange={handleInputChange}
            required
            error={!!errors.correo}
            helperText={errors.correo}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary">
            Registrar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default PopupForm;