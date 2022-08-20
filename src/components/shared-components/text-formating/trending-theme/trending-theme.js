import React from 'react';

export const TrendingTheme = ({name, num}) => {
    
    return(
        <div className='trending-theme-wrap flex row a-center jc-sb'>
            <p>"{name}"</p>
            <div className='flex column a-start jc-end'>
                <p className='trending-theme-num'>{num}</p>
                <p className='mentions'>Mentions</p>
            </div>
        </div>
    )
}