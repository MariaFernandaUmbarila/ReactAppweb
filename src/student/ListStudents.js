import * as React from "react";
import { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import MultiIconCell from "./IconsStudent";
import StudentGrades from './StudentGrades';
import PopupForm from './CreateEditStudent.js';
import CalificacionesForm from './AddNote.js';


export default function DataTable() {

    const columns = [
        { field: "Id", headerName: "ID", width: 70, valueGetter: (params) => params.row.id },
        { field: "Nombre", headerName: "Nombre", width: 130, valueGetter: (params) => params.row.nombre },
        { field: "Apellido", headerName: "Apellido", width: 130, valueGetter: (params) => params.row.apellido },
        { field: "Correo", headerName: "Correo", width: 250, valueGetter: (params) => params.row.correo },
        {
            field: "Acciones", headerName: "Acciones", width: 90, renderCell: (params) => (
                <MultiIconCell
                    onEdit={() => handleEditClick(params.row.id)}
                    onDelete={() => handleDeleteClick(params.row.id)}
                    onAddNote={() => handleaddNoteClick(params.row.id)}
                />
            )
        },
        {
            field: "Notas", headerName: "Notas", width: 130, renderCell: (params) => (
                <button
                    className="custom-button"
                    onClick={() => handleNotesClick(params.row.id)}>
                    Ver Notas
                </button>
            )
        },
    ];

    const [rows, setData] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);
    const [editedStudent, setEditedStudent] = useState(null);

    const updateStudentList = () => {
        return fetch('http://localhost:8081/api/get_all_students')
            .then((response) => response.json())
            .then((data) => {
                setData(data); // Actualiza la lista de estudiantes con los datos recibidos
                return data; // Devuelve los datos actualizados
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                throw error; // Propaga el error para que lo manejes en otro lugar
            });
    };


    const handleEditClick = (id) => {
        // Buscar al estudiante en 'rows' con el ID correspondiente
        const studentToEdit = rows.find((student) => student.id === id);
        if (studentToEdit) {
            setEditedStudent(studentToEdit);
            setIsFormOpen(true);
        }
    };

    const handleDeleteClick = (id) => {
        fetch('http://localhost:8081/api/delete_student/' + id, {
            method: 'DELETE',
        })
            .then(() => {
                // Después de la eliminación, actualizar la lista de estudiantes
                updateStudentList();
            })
            .catch((error) => console.error('Error al eliminar el estudiante:', error));
    };

    const handleaddNoteClick = () => {
        if (isNoteFormOpen) {
            setIsNoteFormOpen(false);
          } else {
            setIsNoteFormOpen(true);
          }
    };

    const handleNotesClick = (id) => {
        fetch(`http://localhost:8081/api/get_student_summary/${id}`)
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

    function updateStudentData(id, editedData) {
        // Envía los datos editados al servidor para la actualización
        return fetch(`http://localhost:8081/api/update_student/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedData), // Datos editados
        })
            .then((response) => {
                if (response.ok) {
                    return updateStudentList(); // Devuelve la promesa de la actualización de la lista
                } else {
                    throw new Error('Error al actualizar el estudiante');
                }
            })
            .catch((error) => {
                throw error; // Propaga el error para que lo manejes en otro lugar
            });
    };

    const updateEditedStudent = (id, updatedData) => {
        const updatedRows = rows.map((student) => {
            if (student.id === id) {
                return { ...student, ...updatedData };
            }
            return student;
        });

        setData(updatedRows);
    };

    const tableContainerStyle = {
        margin: 'auto',
        width: '80%'
    };

    useEffect(() => {
        updateStudentList();
    }, []);

    return (
        <div>
            <h1>Gestión de los estudiantes</h1>
            <h3>A continuación se muestra la lista de estudiantes, podrá ordenar, editar o eliminar los registros</h3>
            <DataGrid style={tableContainerStyle}
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10]}
            />

            {isDialogOpen && selectedStudent && setSelectedStudent &&(
                <StudentGrades
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    student={selectedStudent}
                />
            )}

            {isFormOpen && editedStudent && (
                <PopupForm
                    open={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    onRegister={(editedData) => {
                        updateStudentData(editedStudent.id, editedData)
                            .then(() => {
                                updateEditedStudent(editedStudent.id, editedData); // Actualiza la fila en lugar de toda la lista
                                setIsFormOpen(false);
                            })
                            .catch((error) => {
                                console.error('Error al actualizar el estudiante:', error);
                            });
                    }}
                    formData={editedStudent}
                />
            )}
            <CalificacionesForm
                open={isNoteFormOpen}
                onClose={() => setIsNoteFormOpen(false)}
                onAdd={handleaddNoteClick}
            />
        </div >
    );
}

