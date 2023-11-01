import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

function CalificacionesForm({ open, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    codigoCurso: '',
    nombreMateria: '',
    notaDefinitiva: '',
  });

  const handleFormSubmit = () => {
    onAdd(formData);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Nota</DialogTitle>
      <DialogContent>
        <TextField
          name="codigoCurso"
          label="Código de Curso"
          fullWidth
          onChange={handleInputChange}
          value={formData.codigoCurso}
        />
        <TextField
          name="nombreMateria"
          label="Nombre de la Materia"
          fullWidth
          onChange={handleInputChange}
          value={formData.nombreMateria}
        />
        <TextField
          name="notaDefinitiva"
          label="Nota Definitiva"
          fullWidth
          onChange={handleInputChange}
          value={formData.notaDefinitiva}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CalificacionesForm;