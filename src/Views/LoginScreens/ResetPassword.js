import React, {useState} from 'react';
import {CssBaseline} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import firebase from "firebase/app";
import Fade from "@material-ui/core/Fade";

const ResetPassword = () => {
    const classes = useStyles();
    let auth = firebase.auth();
    const [showMessage, setShowMessage] = useState(false)


    function resetPassword(event) {
        const {email} = event.target.elements;

        window.event.preventDefault()
        auth.sendPasswordResetEmail(email.value).then(function () {
            setShowMessage(true)
        }).catch(function (error) {
            // An error happened.

        });
    }

    return (
        <div>
            <Fade in timeout={1000}>
            <div className={classes.root}>
                <CssBaseline/>
                {showMessage && <Grid container direction={'column'} alignItems={'center'} alignContent={'center'}>
                    <Grid item>
                        <Typography variant={"h4"} style={{color:'white'}}>
                            Reset email sent, please check your inbox</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"body1"} style={{color:'white'}}>
                            (it might take a minute or two to arrive)</Typography>
                    </Grid>
                </Grid>}
                {!showMessage && <Grid container direction={'column'} alignItems={'center'} alignContent={'center'}>

                    <Grid item>
                        <Typography variant={'h1'} className={classes.appName}>Ella</Typography>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.subtitle}>Voice surveys as easy as a,b,c</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" className={classes.title}>Reset Password</Typography>
                    </Grid>
                    <Grid item xs={6} xl={6}>
                        <form className={classes.form} noValidate onSubmit={resetPassword}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                className={classes.formField}
                                // error={errorForm}
                                InputLabelProps={{style: {color: 'black', backgroundColor: 'transparent'}}}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                Reset
                            </Button>
                        </form>
                    </Grid>
                </Grid>}
            </div>
            </Fade>
        </div>
    )
};

export default ResetPassword;


const useStyles = makeStyles(theme => ({
    root: {
        background: "linear-gradient(#1f69fe, #02bde6)",
        height: '100vh',
        paddingTop: 50,
        overflow: 'hidden'

    },
    containerCustom: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        verticalAlign: 'baseline',
        zIndex: 10
    },
    img: {
        maxWidth: "100vw",
        zIndex: 0
    },
    title: {
        fontFamily: 'Comfortaa',
        color: 'white'
    },
    subtitle: {
        fontFamily: 'Comfortaa',
        color: 'white',
        marginBottom: 80

    },
    appName: {
        fontFamily: 'Comfortaa',
        color: 'white',
    },
    formField: {
        backgroundColor: 'white',
        borderRadius: 5
    },
    submit: {
        backgroundColor: 'white',
        color: 'blue',
        marginTop: 20

    }
}));
