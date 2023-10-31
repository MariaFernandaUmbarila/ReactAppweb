import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

function PopupForm({ open, onClose, onRegister }) {
  const [formData, setFormData] = useState({ nombre: '', apellido: '', correo: '' });

  const handleFormSubmit = () => {
    onRegister(formData);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Nuevo Estudiante</DialogTitle>
      <DialogContent>
        <TextField
          name="nombre"
          label="Nombre"
          fullWidth
          value={formData.nombre}
          onChange={handleInputChange}
        />
        <TextField
          name="apellido"
          label="Apellido"
          fullWidth
          value={formData.apellido}
          onChange={handleInputChange}
        />
        <TextField
          name="correo"
          label="Correo"
          fullWidth
          value={formData.correo}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary">
          Registrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PopupForm;
