import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

function MultiIconCell({ OnEdit, OnDelete, OnAddNote }) {

    const iconStyle = { marginRight: '15px', cursor: 'pointer' };

    return (
        <div>
            <span title="Editar estudiante" aria-label="Editar estudiante">
                <EditOutlinedIcon onClick={OnEdit} style={iconStyle}/>
            </span>
            <span title="Eliminar estudiante" aria-label="Eliminar estudiante">
                <DeleteOutlineOutlinedIcon onClick={OnDelete} style={iconStyle}/>
            </span>
            <span title="Agregar calificación" aria-label="Agregar calificación">
                <AddCircleOutlinedIcon onClick={OnAddNote} style={iconStyle}/>
            </span>
        </div>
    );
}

export default  MultiIconCell;