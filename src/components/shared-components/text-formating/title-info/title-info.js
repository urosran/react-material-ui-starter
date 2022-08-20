import { InfoOutlined } from '@mui/icons-material';
import React from 'react';


export const TitleInfo = ({title, info}) => {

    return(
        <div className={`title-info-wrap flex row a-end jc-start`}>
           <p>{title}</p> 
           <div className='title-info-info clickable' title={info}><InfoOutlined className='title-info-icon' /></div>
        </div>
    )
}