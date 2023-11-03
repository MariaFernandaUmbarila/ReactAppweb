import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function StudentGrades({ open, onClose, student }) {

  console.log(open, onClose, student);

  const handleClose = () => {
    onClose();
  };

  if (student !== undefined){
    return (
      <Dialog open={open} onClose={handleClose}>      
        <DialogTitle>Detalle del Estudiante {student["item1"].estudiante}</DialogTitle> 
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Código de Curso</TableCell>
                  <TableCell>Nombre de la Materia</TableCell>
                  <TableCell>Nota Definitiva</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(student).map(courseKey => (
                  <TableRow key={courseKey}>
                    <TableCell>{student[courseKey].codigo}</TableCell>
                    <TableCell>{student[courseKey].nombre}</TableCell>
                    <TableCell>{student[courseKey].valor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
}

export default StudentGrades;


