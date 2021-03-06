import React, {useCallback, useContext, useEffect, useState} from "react";
import {withRouter, Redirect} from "react-router";
import {Button, FormLabel} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import GoogleButton from 'react-google-button'
import firebaseApp from "../../Firebase/firebaseApp.js";
import firebase from 'firebase/app';
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import {AppContext} from "../../context/AppContext";
import {setUserDataGlobally} from "../../utils/sharedFunctions";


const Login = ({history}) => {
    const classes = useStyles();
    const [showError, setShowError] = useState(false)
    const {dispatch} = useContext(AppContext);

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged(async function (user) {
            if (user) {
                console.log('effecting and routing per user type')
                await routePerUserType(user)
            } else {
            }
        })
    }, [])


    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            console.log("LOGGING IN via button pressed")
            try {
                let user = await firebaseApp
                    .auth()
                    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
                    .then(function () {
                        return firebaseApp.auth().signInWithEmailAndPassword(email.value, password.value);
                    });
                await routePerUserType(user.user)
            } catch (error) {
                setShowError(true)
                console.log(error)
            }
        },
        [history]
    );
    //
    // const shouldGoogleLogIn = (event) => {
    //     firebase.auth().onAuthStateChanged(function (user) {
    //         if (user) {
    //             // history.push('/')
    //         } else {
    //             gBtnLogin(event)
    //         }
    //     })
    // }
    //
    // const gBtnLogin = useCallback(
    //     async event => {
    //         event.preventDefault();
    //         try {
    //             await app
    //                 .auth()
    //                 .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    //                 .then(function () {
    //                     return firebase.auth().signInWithPopup(provider).then(function (result) {
    //                     })
    //                 }).catch(function (error) {
    //
    //                 });
    //             history.push("/dashboard");
    //         } catch (error) {
    //             alert("Some information is incorrect, or you used Google to sign in last time");
    //         }
    //     },
    //     [history]
    // );

    async function routePerUserType(user) {
        if (user) {
            let userFromDb = await setUserDataGlobally(dispatch)

            switch (userFromDb.accountType) {
                case "ACCOUNTANT":
                    history.push('/dashboard')
                    break;
                case "ACCOUNTANTS_CLIENT":
                    history.push('/client/' + user.uid)
                    break;
            }
        }
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Grid container direction={'column'} alignContent={"center"} alignItems={'center'}>
                <Grid item>
                    <Typography variant={'h1'} className={classes.appName}>app</Typography>
                </Grid>
                <Grid item>
                    <Typography className={classes.subtitle}>easiest 1099 filing you could imagine</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h4" className={classes.title}>Log in</Typography>
                </Grid>
                {showError &&
                <Typography variant={"body1"} style={{color: "red"}}>
                    Some information is incorrect, or you used Google to sign in (click sign in with Google)
                </Typography>}

                <Grid item xs={6} xl={6}>
                    <form className={classes.form} noValidate onSubmit={handleLogin}>
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            className={classes.formField}
                            InputLabelProps={{style: {color: 'black', backgroundColor: 'transparent'}}}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                        >
                            Log in
                        </Button>
                    </form>
                </Grid>
                {/*<Grid item className={classes.gBtnLogin}>*/}
                {/*    <GoogleButton onClick={shouldGoogleLogIn}/>*/}
                {/*</Grid>*/}
                <Button className={classes.resetPassword}
                        onClick={() => {
                            history.push('/resetPassword')
                        }}>Reset password</Button>
            </Grid>
        </div>
    )
}

export default withRouter(Login);

const useStyles = makeStyles(theme => ({
    gBtnLogin: {
        margin: 30
    },
    root: {
        background: `linear-gradient(${theme.palette.primary.light}, #02bde6)`,
        minHeight: '100vh',
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
        // backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.light,
        // color: 'blue',
        marginTop: 20
    },
    resetPassword: {
        marginTop: 20
    }
}))
