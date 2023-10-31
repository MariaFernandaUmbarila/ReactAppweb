import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

function MultiIconCell({ onEdit, onDelete, onAddNote }) {

    const iconStyle = { marginRight: '15px', cursor: 'pointer' };

    return (
        <div>
            <span title="Editar estudiante" aria-label="Editar estudiante">
                <EditOutlinedIcon onClick={onEdit} style={iconStyle}/>
            </span>
            <span title="Eliminar estudiante" aria-label="Eliminar estudiante">
                <DeleteOutlineOutlinedIcon onClick={onDelete} style={iconStyle}/>
            </span>
            <span title="Agregar calificación" aria-label="Agregar calificación">
                <AddCircleOutlinedIcon onClick={onAddNote} style={iconStyle}/>
            </span>
        </div>
    );
}

export default  MultiIconCell;