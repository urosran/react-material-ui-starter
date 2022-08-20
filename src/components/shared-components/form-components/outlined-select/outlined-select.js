import React, { useState } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';

export const OutlinedSelect = ({width=200, value, label, options=[]}) => {
    const [selectedOption, setSelectedOption] = useState('');
   
    return(
        <div className='outlined-select-wrap'>
            <FormControl sx={{ m: 1, width: width }}>
                <Select
                    value={value}
                    label={label}
                    onChange={() => setSelectedOption(value)}
                >
                    {options.map((option, index) => (
                        <MenuItem key={`outlined-select-option-${index}`} value={option.value}>{option.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}