import { CheckBoxOutlineBlank, CheckBoxOutlineBlankOutlined, CheckBoxOutlined } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import React, { useState } from 'react';

export const CheckboxOption = ({optionText, selected, onClick}) => {
    return(
        <div className='checkbox-option-wrap flex row a-center jc-start' onClick={() => onClick()}>
            {selected ? <CheckBoxOutlined className='checkbox-option-checkbox-selected'/> : <CheckBoxOutlineBlankOutlined/>}
            <p>{optionText}</p>
        </div>
    )
}