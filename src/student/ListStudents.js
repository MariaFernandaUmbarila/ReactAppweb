import * as React from "react";
import { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import MultiIconCell from "./IconsStudent";
import StudentGrades from './StudentGrades';
import PopupForm from './CreateEditStudent.js';

export default function DataTable() {

    const columns = [
        { field: "Id", headerName: "ID", width: 70, valueGetter: (params) => params.row.id },
        { field: "Nombre", headerName: "Nombre", width: 130, valueGetter: (params) => params.row.nombre },
        { field: "Apellido", headerName: "Apellido", width: 130, valueGetter: (params) => params.row.apellido },
        { field: "Correo", headerName: "Correo", width: 250, valueGetter: (params) => params.row.correo },
        {
            field: "Acciones", headerName: "Acciones", width: 250, renderCell: (params) => (
                <MultiIconCell
                    onEdit={() => handleEditClick(params.row.id)}
                    onDelete={() => handleDeleteClick(params.row.id)}
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
    const [editedStudent, setEditedStudent] = useState(null);

    const handleEditClick = (id) => {
        // Buscar al estudiante en 'rows' con el ID correspondiente
        const studentToEdit = rows.find((student) => student.id === id);
        if (studentToEdit) {
            setEditedStudent(studentToEdit);
            setIsFormOpen(true);
        }
    };

    const handleDeleteClick = (id) => {
        fetch('http://localhost:8081/api/delete_student/' + id)
            .then((response) => response.json())
            .catch((error) => console.error('Error fetching data:', error));
    };

    const handleNotesClick = (id) => {
        fetch(`http://localhost:8081/api/get_student_summary/${id}`)
            .then(response => response.json())
            .then(data => {
                setSelectedStudent(data);
                setIsDialogOpen(true);
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
                    // Si la actualización es exitosa, obtén los datos actualizados
                    return fetch('http://localhost:8081/api/get_all_students')
                        .then((response) => response.json());
                } else {
                    throw new Error('Error al actualizar el estudiante');
                }
            })
            .catch((error) => {
                throw error; // Propaga el error para que lo manejes en otro lugar
            });
    }

    const tableContainerStyle = {
        margin: 'auto',
        width: '80%'
    };

    useEffect(() => {
        fetch('http://localhost:8081/api/get_all_students')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Gestión de los estudiantes</h1>
            <h3>A continuación se muestra la lista de estudiantes, podrá ordenar, editar o eliminar los registros</h3>
            <DataGrid style={tableContainerStyle}
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
            {isDialogOpen && selectedStudent && (
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
                            .then((data) => {
                                // Actualiza el estado 'rows' con los datos actualizados
                                setData(data);
                                setIsFormOpen(false); // Cierra el formulario después de la actualización
                            })
                            .catch((error) => {
                                console.error('Error al actualizar el estudiante:', error);
                                // Manejo de errores
                            });
                    }}
                    formData={editedStudent}
                />
            )}
        </div >
    );
}

