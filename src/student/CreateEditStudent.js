import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

function PopupForm({ open, onClose, onSubmit }) {

  const [formData, setFormData] = useState({});

  const handleFormSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Popup Form</DialogTitle>
      <DialogContent>
        <TextField
          name="field1"
          label="Field 1"
          fullWidth
          onChange={handleInputChange}
        />
        <TextField
          name="field2"
          label="Field 2"
          fullWidth
          onChange={handleInputChange}
        />
        {/* Add more form fields as needed */}
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

export default PopupForm;
