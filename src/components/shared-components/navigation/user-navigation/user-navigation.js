import { KeyboardArrowDown, KeyboardArrowUp, Person } from '@mui/icons-material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export const UserNavigation = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [toggleProfileMenu, setToggleProfileMenu] = useState(false);
    return(

        <div className='user-navigation-wrap'>
             <nav>
              <ul>
               {isLoggedIn ?  
                  <li className='profile-navigation'  onClick={()=>setToggleProfileMenu(!toggleProfileMenu)}>
                    <Person/>
                    <Link to="/user-panel" className='profile-navigation-username'>Petar Pericsjsjsjajjsjajsjsj</Link>
                    {toggleProfileMenu ? <KeyboardArrowDown className='color-b'/> : <KeyboardArrowUp className='color-b'/>}
                    <div className={`profile-navigation-menu ${!toggleProfileMenu && 'visible'}`}>
                      <ul>
                        <li><Link to="/user-panel" >Moj Panel</Link></li>
                        <li onClick={()=>setIsLoggedIn(false)}>Odjava</li>
                      </ul>
                    </div>
                  </li> :
                  <li onClick={()=>setIsLoggedIn(true)}>
                    <Link to="/login" >Prijava/Registracija</Link>
                  </li>}
                
               
              </ul>
            </nav>
        </div>
    )
}