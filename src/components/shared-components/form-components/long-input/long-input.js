import { TextField } from '@mui/material';
import React from 'react';


export const LongInput = ({title,label, width}) => {
    
    return (
        <div className={'long-input-wrap'} style={{width: width}}>
            {title && <p className='small-subtitle'>{title}</p>}
            <TextField id="standard-basic" className='long-input' label={label} variant="standard" />

        </div>
    )
}