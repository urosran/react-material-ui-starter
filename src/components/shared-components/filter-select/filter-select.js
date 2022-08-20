import React from 'react';


export const FilterSelect = ({className='row', label, options, onChange, placeholder}) => {

    return(
        <div className={`filter-select-wrap ${className}`} >
            {label && <label>{label}</label>}
            <select className='select-field' onChange={()=>onChange}>
                <option value="" disabled selected>{placeholder}</option>
                
                {options.map((option, index)=> (
                    <option className='select-option' key={`select-option-${option.name}-${index}`} value={option.value}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}