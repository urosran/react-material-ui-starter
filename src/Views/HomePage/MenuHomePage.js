import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import {useHistory} from "react-router";


export default function ButtonAppBar() {
    const classes = useStyles();
    const history = useHistory()

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="static" color={'white'}>
                <Toolbar>
                    {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                    {/*    <MenuIcon />*/}
                    {/*</IconButton>*/}
                    <Typography variant="h6" className={classes.title}>
                        name<strong>name</strong>
                    </Typography>
                    <Button className={classes.loginButton} color="inherit" variant={"outlined"} onClick={()=>history.push('login')} >Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    formField:{

    },
    loginButton: {
        backgroundColor: theme.palette.primary.light,
        color: 'white',
        margin: 10,
        borderRadius: 30
    },

}));

