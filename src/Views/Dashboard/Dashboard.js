import React, {useState, useContext, useEffect} from 'react';
import firebase from 'firebase';
import axios from "axios";
import {serverUrl} from '../../config'

import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Toast from "../../utils/sharedComponents/Toast";
import Menu from "../Menu/Menu";
import {AppContext} from "../../context/AppContext";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import AddClientModal from "../../utils/modals/AddClientModal";
import UserTableOverview from "../CommonComponents/UserTableOverview";
import AppBarSpacer from "../../utils/sharedComponents/AppBarSpacer";
import {enums} from "../../utils/enums";
import {addAccountantsClientToDb} from "../../utils/sharedFunctions";
import useProtectRoute from "../../utils/hooks/useProtectRoute";
import {useHistory} from "react-router";
import HelpOutlineIcon from '@material-ui/icons/ContactSupport';
import VideoTutorial from "../../utils/modals/VideoTutorialModal";
import Button from "@material-ui/core/Button";
import MenuListItems from "../CommonComponents/menuListItems";

const drawerWidth = 240;

const Dashboard = () => {
    const user = firebase.auth().currentUser;
    const history = useHistory()
    const screenHeight = window.screen.height;
    const screenWidth = window.screen.width;
    useProtectRoute()

    const classes = useStyles();
    const {state: {}, dispatch} = useContext(AppContext);
    const [toastStatus, setToastStatus] = useState(null);
    const [openTutorialModal, setOpenTutorialModal] = useState(false);
    const [shouldOpenAddClientModal, setShouldOpenClientModal] = useState(false)

    function showToast(toastType, toastMessage) {
        setToastStatus({
            toastType: toastType,
            toastMessage: toastMessage,
            date: Date()
        })
    }

    useEffect(() => {
        dispatch({loadingBarProgress: 40})
        console.log("fetching data inside")

        async function fetchAllDataForUser() {
            console.log("axios call")
            axios({
                method: "POST",
                url: serverUrl + '/getDataForTheApp',
                data: {
                    userUid: user.uid
                },
            }).then(response => {
                if (response.status === 200) {
                    dispatch({loadingBarProgress: 80})
                    showToast("success", "Data Fetched!");
                }
            }).catch(function (error) {
                if (error.response) {
                    dispatch({loadingBarProgress: 100})
                    showToast("error", "Something went wrong, please refresh the page!")
                }
                if (error.response.status === 404) {
                    showToast("error", "Not found")
                    history.push('/login')
                }

            });
        }

        user && fetchAllDataForUser()
    }, [user]);

    //TODO: ENABLE VERIFICATION PROTECTION
    // if (user && !user.emailVerified) {
    //     console.log(!user.emailVerified)
    //     return (<VerifyEmail/>)
    // }

    async function handleAddAccountantsClient(accountantsClientInformation, userDataObject) {
        try {
            // await addAccountantsClientToDb(userDataObject, accountantsClientInformation, listOfUsersClients, dispatch)
            showToast("success", "Client Added!")
        } catch (e) {
            showToast("error", "Something went wrong, please try again! (Perhaps you used that email already?)")
        }
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Menu listOfItemsToRender={<MenuListItems/>}/>

            <main className={classes.content}>
                <AppBarSpacer/>

                <Fab className={classes.fab} color="primary" aria-label="add"
                     onClick={() => console.log("click")}>
                    <AddIcon/>
                </Fab>


                <Grid container direction={"column"} className={classes.addClientText} alignContent={"center"}
                      alignItems={"center"} justify={"center"}>
                    <Grid item>
                        <Typography variant={"h2"}>
                            Click {
                            <Fab color="primary" aria-label="add"
                                 onClick={() => console.log("Add button pressed")}>
                                <AddIcon/>
                            </Fab>
                        }
                            {<br/>} to add your first client</Typography>
                    </Grid>
                </Grid>

                <Grid container justify={"center"}>
                    <Grid item>
                        {/*//TODO: Some Content*/}
                    </Grid>
                </Grid>

            </main>

            {shouldOpenAddClientModal &&
            <AddClientModal
                clientTypeToAdd={enums.ACCOUNTANTS_CLIENT}
                title={"Add a Client"}
                contextTriggerFieldToUpdate={{addAccountantsClient: true}}
                shouldOpenAddAccountantsModal={shouldOpenAddClientModal}
                showToast={showToast}
                onSubmitHandlerFunction={handleAddAccountantsClient}
            />}
            {openTutorialModal &&
            <VideoTutorial openModal={openTutorialModal} setOpenModal={setOpenTutorialModal}
                           screenHeight={screenHeight} screenWidth={screenWidth} youtubeEmbedUrl={'https://www.youtube.com/embed/hY7m5jjJ9mM'}/>}
            <Button variant={"outlined"} className={classes.fabTutorial} color="primary" aria-label="add"
                    onClick={() => setOpenTutorialModal(true)}>
                <HelpOutlineIcon/> Tutorial
            </Button>

            {toastStatus ? <Toast key={toastStatus.date} toastStatus={toastStatus}/> : null}
        </div>
    );
}

export default Dashboard

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
    modalCustom: {
        backgroundColor: 'white',
        margin: 40,
        padding: 40
    },
    fixedMinHeight: {
        minHeight: 240,
        marginTop: 10
    },
    modal: {
        borderRadius: 10
    },
    addSruveyBtn: {
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main
    },
    columnTitle: {
        fontFamily: 'Comfortaa',
        margin: 10
    },
    fab: {
        position: "fixed",
        top: 80,
        right: 10,
    },
    fabTutorial: {
        position: "fixed",
        borderRadius: 30,
        bottom: 80,
        right: 10,
    },
    addClientText: {
        marginTop: '10vh',
        textAlign: 'center'
    }
}));
