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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function StudentGradesDetail({ open, onClose, studentDetail, student }) {

  const handleClose = () => {
    onClose();
  };

  const iconStyle = { marginRight: '15px', cursor: 'pointer' };

  if (studentDetail !== undefined){
    return (
      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
            style: {
            maxWidth: '90%', 
            maxHeight: '90%',
            },
        }}
      >      
        <DialogTitle>
            Estudiante: {student["item1"].estudiante} <br></br>
            Asignatura: {studentDetail["item1"].nombre}
        </DialogTitle> 
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Observación</TableCell>
                    <TableCell>Porcentaje</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>                
                {Object.keys(studentDetail).map(courseKey => (
                  <TableRow key={courseKey}>
                    <TableCell>{studentDetail[courseKey].notaId}</TableCell>
                    <TableCell>{studentDetail[courseKey].observacion}</TableCell>
                    <TableCell>{studentDetail[courseKey].porcentaje}</TableCell>
                    <TableCell>{studentDetail[courseKey].valor}</TableCell>
                    <TableCell>
                      <div>
                        <span title="Editar nota" aria-label="Editar nota">
                            <EditOutlinedIcon style={iconStyle}/>
                        </span>
                        <span title="Eliminar nota" aria-label="Eliminar nota">
                            <DeleteOutlineOutlinedIcon style={iconStyle}/>
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <h5>Con el porcentaje acumulado de {studentDetail["item1"].sumaPorcentajes}% la  nota es {studentDetail["item1"].promedio}</h5>
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

export default StudentGradesDetail;


