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
import { useState } from 'react';
import StudentGradesDetail from './GradesDetail';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function StudentGrades({ open, onClose, student }) {

  const handleClose = () => {
    onClose();
  };

  const iconStyle = { marginRight: '15px', cursor: 'pointer' };
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNotesSubjectClick = (id_estudiante, id_materia) => {
    fetch(`http://localhost:8081/api/get_student_subject_summary/${id_estudiante}/${id_materia}`)
      .then(response => response.json())
      .then(data => {
          if (Object.keys(data).length > 0) {
            setSelectedStudent(data);
            setIsDialogOpen(true);
          }
      })
      .catch(error => {
          console.error('Error fetching student data:', error);
      });
  };

  if (student !== undefined){
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle>
            Estudiante: {student["item1"].estudiante}            
          </DialogTitle> 
          <button className="custom-button" style={{ marginRight: '8px' }}>               
            Añadir Nota
          </button>
        </div>        
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Código de Curso</TableCell>
                  <TableCell>Nombre de la Materia</TableCell>
                  <TableCell>Nota Definitiva</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(student).map(courseKey => (
                  <TableRow key={courseKey}>
                    <TableCell>{student[courseKey].codigo}</TableCell>
                    <TableCell>{student[courseKey].nombre}</TableCell>
                    <TableCell>{student[courseKey].valor}</TableCell>
                    <TableCell>
                      <div>
                        <span title="Ver detalle" aria-label="Ver detalle">
                          <RemoveRedEyeIcon style={iconStyle} onClick={() => handleNotesSubjectClick(student[courseKey].estudianteId, student[courseKey].materiaId)}/>
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        
        {isDialogOpen && selectedStudent && setSelectedStudent &&(
          <StudentGradesDetail
              open={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              studentDetail={selectedStudent}
              student={student}
          />
        )}

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


