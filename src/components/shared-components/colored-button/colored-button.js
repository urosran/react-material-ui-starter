import { Button } from '@mui/material';
import React from 'react';


export const ColoredButton = ({label, color, width,height, fontSize, icon, onClick, disabled=false}) => {

    return (
        <Button 
            className={`colored-button-wrap`} 
            variant="contained" 
            style={{backgroundColor: `${color}`, width: `${width}`, height: `${height}`, fontSize:`${fontSize}`}} 
            onClick={() => onClick()}
            disabled={disabled}>
                {label}{icon && icon}
        </Button>
    )
}