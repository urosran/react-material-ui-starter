import React, {useContext} from 'react';
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import firebaseApp from "../../Firebase/firebaseApp";
import Menu1 from '@material-ui/core/Menu'
import {useHistory} from "react-router";
import LoadingBar from 'react-top-loading-bar'
import {AppContext} from "../../context/AppContext";

const drawerWidth = 240;

const Menu = ({doNotRenderOptions, listOfItemsToRender}) => {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const classes = useStyles();
    const history = useHistory();
    const {state: {loadingBarProgress}, dispatch} = useContext(AppContext);

    const onLoaderFinished = () => {
        dispatch({
            loadingBarProgress: 0
        })
    }

    const handleDrawerOpen = () => {
        setOpenDrawer(true)
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    function handleSignOut() {
        firebaseApp.auth().signOut()
        // window.location.reload()
        history.replace('/login')
    }

    return (
        <div>
            <LoadingBar
                progress={loadingBarProgress}
                height={8}
                color="red"
                onLoaderFinished={onLoaderFinished}
            />
            <AppBar position="absolute" className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <Menu1/>
                    {!doNotRenderOptions &&
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, openDrawer && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>}
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        name<strong>name</strong>
                    </Typography>
                    <Button style={{color: 'white'}} onClick={() => handleSignOut()}>Sign out</Button>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="temporary"
                classes={{
                    paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
                }}
                open={openDrawer}
                onBackdropClick={handleDrawerClose}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                {/*//TODO: RENDER DIFFERENT OPTIONS BASED ON THE TYPE OF CLIENT LOOKING AT THE MENU*/}
                {listOfItemsToRender}
                {/*<Divider />*/}
                {/*<List>{secondaryListItems}</List>*/}
            </Drawer>
        </div>
    );
};

export default Menu


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        fontFamily: 'Comfortaa',

    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));
