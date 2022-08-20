import React from  'react';


export const NumberLabel = ({number, label, className}) => {

    return(
        <div className={`number-label-wrap flex row a-center jc-start ${className && className}`}>
            <p>{number}</p>
            <span>{label}</span>
        </div>
    )
}