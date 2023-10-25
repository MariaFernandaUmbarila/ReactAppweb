import * as React from "react";
import { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "Id", headerName: "ID", width: 70, valueGetter: (params) => params.row.id },
    { field: "Nombre", headerName: "Nombre", width: 130, valueGetter: (params) => params.row.nombre },
    { field: "Apellido", headerName: "Apellido", width: 130, valueGetter: (params) => params.row.apellido },
    { field: "Correo", headerName: "Correo", width: 250, valueGetter: (params) => params.row.correo },
];

export default function DataTable() {

    const [rows, setData] = useState([]);

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
