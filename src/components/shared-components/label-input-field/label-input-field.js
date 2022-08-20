import React, { useState } from 'react';

export const LabelInputField = ({type,onIconRightClick, onIconLeftClick, iconLeftClickable, iconRightClickable, position, label, placeholder, onChange, iconLeft, iconRight}) => {
    const [inputValue, setInputValue] = useState(null);
    return(
        <div className={`label-input-field-wrap ${position === 'row' ? 'row' : 'column'}`}>
            {label && <label>{label}</label>}
            <div className='input-field-icon'>
                {iconLeft && <p onClick={()=>onIconLeftClick()} className={iconLeftClickable && 'clickable'}>{iconLeft}</p>}
                <input 
                    type={type} 
                    placeholder={placeholder} 
                    onChange={(e) => onChange ? setInputValue(e.target.value) : onChange(e.target.value)}/>
                {iconRight && <p onClick={()=>onIconRightClick()} className={`icon-right ${iconRightClickable && 'clickable'}`}>{iconRight}</p>}
            </div>
        </div>

    )
}