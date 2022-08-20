import { AddBoxOutlined } from '@mui/icons-material';
import React from 'react';

export const AddBox = ({label, size}) => {
    
    return(
        <div className={`add-box-wrap ${size && size}`}>
            <AddBoxOutlined className='icon-wrap'/>
            <p>{label}</p>
        </div>
    )
}