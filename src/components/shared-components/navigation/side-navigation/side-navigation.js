import React, { useContext } from 'react';
import { ConfigContext } from '../../../../contexts/config-context';
import {Link} from 'react-router-dom';


export const SideNavigation = ({location}) => {
    const {navItems} = useContext(ConfigContext);
    return(
        <div className='side-navigation-wrap'>
             <nav>
              <ul>
                {navItems.map((item, index) => (
                    <li key={`nav-item-${index}`} className={`side-navigation-item ${item.path === location.pathname && 'active'}`}>
                        <Link to={item.path} key={`nav-link-${index}`} className='bold'>{item.title}</Link>
                    </li>
                ))}
              </ul>
            </nav>
        </div>
    )
}