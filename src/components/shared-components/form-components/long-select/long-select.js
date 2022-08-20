import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';


export const LongSelect = ( {id, title, labelId, value, onChange, label, menuItems} ) => {
    console.log(menuItems);
    const [selectedOption, setSelectedOption] = useState("");
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
      };
    return(
        <div className='long-select-wrap'>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width:'100%' }}>
                <InputLabel id={id}>{title}</InputLabel>
                <Select
                labelId={labelId}
                id={id}
                value={value}
                onChange={() => handleChange()}
                label={label}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        menuItems.map((index, item) => (
                           
                            <MenuItem key={`menu-item-select-${item}-${index}`} value={item.value}>{item.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    );
}