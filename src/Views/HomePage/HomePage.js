import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toast from "../../utils/sharedComponents/Toast";
import MenuHomePage from "./MenuHomePage";
import {makeStyles} from "@material-ui/core/styles";
import HowItWorksCard from "./HowItWorksCard";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import SignUpForm from "./SignUpForm";

const HomePage = () => {

    const [toastStatus, setToastStatus] = useState(null);
    const classes = useStyles();

    function showToast(toastType, toastMessage) {
        setToastStatus({
            toastType: toastType,
            toastMessage: toastMessage,
            date: Date()
        })
    }

    return (
        <div>
            <MenuHomePage/>
            <Grid container direction={"row"} justify={'center'} alignItems={'center'} alignContent={"center"}
                  className={classes.getStartedContainer}>
                <Grid className={classes.gridItem} item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Typography className={classes.text} variant={"h1"}>line 1</Typography>
                    <Typography className={classes.text} variant={"h4"}>sub line 2</Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <SignUpForm showToast={showToast}/>
                </Grid>

            </Grid>


            <Grid container className={classes.howItWorksContainer}>
                <Grid item xs={12}>
                    <Grid container direction={"column"} alignContent={"center"} alignItems={"center"}
                          style={{marginTop: 30}}>
                        <Grid item> <Typography variant={"h4"}>How it Works</Typography></Grid>

                        <Grid item> <Typography variant={"h2"} className={classes.titleText}>You The
                            Accountant</Typography></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <HowItWorksCard title={'Set up your dashboard'} imgSrc={'like.svg'}
                                    description={"description"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <HowItWorksCard title={'Get Notified'} imgSrc={'like.svg'}
                                    description={"description"}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <HowItWorksCard title={'Get Approved & Paid'} imgSrc={'like.svg'}
                                    description={"description"}/>
                </Grid>
            </Grid>


            <Grid container>
                <Grid item xs={12}>
                    <Grid container direction={"column"} alignContent={"center"} alignItems={"center"}>
                        <Grid item> <Typography variant={"h2"} className={classes.titleText}>Your Valued
                            Clients</Typography></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <HowItWorksCard title={'title'} imgSrc={'like.svg'}
                                    description={"description."}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <HowItWorksCard title={'title'} imgSrc={'decision-making.svg'}
                                    description={"descr."}/>
                </Grid>
            </Grid>

            <Grid container className={classes.howItWorksContainer}>
                <Grid item xs={12}>
                    <Grid container direction={"column"} alignContent={"center"} alignItems={"center"}>

                        <Grid item> <Typography variant={"h2"} className={classes.titleText}>The 1099 recipient
                            Contractor</Typography></Grid>
                        <Grid item> <Typography variant={"h4"}>Your valued clients may love running their business. But
                            they dread the paperwork</Typography></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{marginTop: 30}}>
                    <Grid container direction={"column"} alignContent={"center"}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <ListItemIcon>
                                    <DoneOutlineIcon color={'primary'}/>
                                </ListItemIcon>
                                <ListItemText primary="list 1"/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DoneOutlineIcon color={'primary'}/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Tlist 2"/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DoneOutlineIcon color={'primary'}/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="list 3"/>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>

            </Grid>

            <Grid container alignContent={"center"} justify={"center"} alignItems={"center"} className={classes.footer}>
                <Grid item xs={6}>
                    <div>
                        <Typography variant={"h4"}>Headquarters<br/><br/></Typography>
                        <Typography variant={"body1"}>539 Massasoit Rd<br/> Worcester Ma,01604 <br/> (508) 414
                            6023</Typography>
                    </div>
                </Grid>

                <Grid item xs={6} style={{marginTop: 20}}>
                    <SignUpForm showToast={showToast} color={'black'}/>
                </Grid>
            </Grid>

            {toastStatus ? <Toast key={toastStatus.date} toastStatus={toastStatus}/> : null}

        </div>
    );
};

export default HomePage;

const useStyles = makeStyles((theme) => ({
    footer: {
        background: '#292D2C 0% 0% no-repeat padding-box',
        opacity: 1,
        color: 'white',
        textAlign: 'center'
    },
    img: {
        width: '40%'
    },
    gridItem: {
        // margin: theme.spacing(2)
    },
    getStartedContainer: {
        backgroundColor: theme.palette.primary.light,
        padding: theme.spacing(2),
        minHeight: '80vh'
    },
    text: {
        color: theme.palette.neutral.main,
        margin: theme.spacing(3)
    },
    getStartedButton: {
        width: '60%',
        backgroundColor: theme.palette.primary.light,
        color: 'white',
        margin: 10,
        borderRadius: 30
    },

    getStartedBox: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.neutral.main,
        maxWidth: '80%',
        minHeight: '40vh',
        borderRadius: 10,
        padding: theme.spacing(3),
        marginBottom: 10,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',

    },
    titleText: {
        color: theme.palette.primary.light,
        margin: theme.spacing(4),
        marginBottom: 50,
        textAlign: 'center'
    },
    howItWorksContainer: {
        marginTop: theme.spacing(0),
        backgroundColor: theme.palette.neutral.gray
    },


}))

