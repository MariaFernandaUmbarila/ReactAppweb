import * as React from "react";
import { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import MultiIconCell from "./IconsStudent";
import StudentGrades from './StudentGrades';

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
                <button onClick={() => handleNotesClick(params.row.id)}>Ver Notas</button>
            )
        },
    ];

    const [rows, setData] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState({});

    const handleEditClick = (id) => {
        console.log(`Edit icon clicked for ID: ${id}`);
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
            {isDialogOpen && (
                <StudentGrades
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    student={selectedStudent}
                />
            )}
        </div>
    );
}

