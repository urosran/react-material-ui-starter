import React from 'react';


export const TitleDate = ({title, date, className, big, small}) => {

    return( 
        <div className={`title-date-wrap ${className && className} ${ big ? 'page-title' : 'small-title'}`}>
            <p>{title} {(date && big) && <span className='title-date-date'>as of {date}</span>}</p>
            {((date && small) && <p className='title-date-date'>Launched on {date}</p>)}
        </div>
    )
}