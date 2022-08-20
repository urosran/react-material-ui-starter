import React from 'react';

export const ProgressBar = ({colorTop, colorBottom, percent, height, width}) => {
    
    return (
        <div className='progress-bar-wrap' style={{backgroundColor:colorBottom, height: height, width:width}}>
            <div className='progress-bar-status' style={{width:`${percent}%`, backgroundColor: `${colorTop}`, height: height}}>
                
            </div>
            
        </div>
    )
}