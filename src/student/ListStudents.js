import * as React from "react";
import { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import MultiIconCell from "./IconsStudent";


export default function DataTable() {

    const columns = [
        { field: "Id", headerName: "ID", width: 70, valueGetter: (params) => params.row.id },
        { field: "Nombre", headerName: "Nombre", width: 130, valueGetter: (params) => params.row.nombre },
        { field: "Apellido", headerName: "Apellido", width: 130, valueGetter: (params) => params.row.apellido },
        { field: "Correo", headerName: "Correo", width: 250, valueGetter: (params) => params.row.correo },
        { field: "Acciones", headerName: "Acciones", width: 250, renderCell:(params) => (
            <MultiIconCell
                onEdit={() => handleEditClick(params.row.id)}
                onDelete={() => handleDeleteClick(params.row.id)}
            />        
        ),}
    ];

    const [rows, setData] = useState([]);

    const handleEditClick = (id) => {
        console.log(`Edit icon clicked for ID: ${id}`);
    };
    
    const handleDeleteClick = (id) => {
        fetch('http://localhost:8081/api/delete_student/' + id)
        .then((response) => response.json())
        .catch((error) => console.error('Error fetching data:', error));
        window.location.reload(false);
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
        </div>
    );
}
