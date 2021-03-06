import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {useHistory} from "react-router";
import List from "@material-ui/core/List";
import firebaseApp from "../../Firebase/firebaseApp";
import PersonIcon from '@material-ui/icons/Person';

const MenuListItems = () => {
    const history = useHistory();
    return (
        <List>
            <ListItem button onClick={() => {
                history.push('../dashboard')
            }}>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </ListItem>

            <ListItem button onClick={() => {
                history.push('../'+firebaseApp.auth().currentUser.uid + '/profile')
            }}>
                <ListItemIcon>
                    <PersonIcon/>
                </ListItemIcon>
                <ListItemText primary="Profile"/>
            </ListItem>

        </List>
    );
};

export default MenuListItems;
