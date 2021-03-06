import React, {useCallback, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GoogleButton from "react-google-button";
import {CssBaseline} from "@material-ui/core";
import {withRouter} from "react-router";
import axios from "axios";
import firebaseApp from "../../Firebase/firebaseApp";
import firebase from 'firebase';
import {serverUrl} from '../../config'
import Toast from "../../utils/sharedComponents/Toast";


var provider = new firebase.auth.GoogleAuthProvider();

const SignUp = ({history}) => {
    const [toastStatus, setToastStatus] = React.useState(null);
    const [errorForm, setErrorForm] = React.useState(false);
    let errorLocal = null

    const classes = useStyles();

    async function handleSignUpNew(event) {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await firebaseApp
                .auth()
                .setPersistence(firebase.auth.Auth.Persistence.SESSION)
                .then(function () {
                    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
                        .then(async function (result) {
                            // This gives you a Google Access Token. You can use it to access the Google API.
                            // var token = result.credential.accessToken;
                            // The signed-in user info.
                            var user = result.user;
                            await createUser(user.uid, user.email);
                            // history.push("/");
                        }).catch((error) => {

                        showToast("error", error.message)
                        errorLocal = error
                        if (error.code === 'auth/email-already-in-use') {
                            history.push('/login')
                        }
                    });
                }).catch((error) => {

                    showToast("error", error.message)
                });
            history.push("/");

        } catch (error) {

        }

        if (errorLocal) {
            showToast("error", errorLocal)
        }
    }

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        let errorLocal = null
        try {
            await firebaseApp
                .auth()
                .setPersistence(firebase.auth.Auth.Persistence.SESSION)
                .then(function () {
                    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
                        .then(function (result) {
                            // This gives you a Google Access Token. You can use it to access the Google API.
                            // var token = result.credential.accessToken;
                            // The signed-in user info.
                            var user = result.user;
                            createUser(user.uid, user.email);
                            history.push("/");

                            //
                            // ...
                        }).catch((error) => {

                        // setErrorForm(true)
                        // showToast("error", error.message)
                        errorLocal = error
                    });
                }).catch((error) => {

                    showToast("error", error.message)
                });
            history.push("/");

        } catch (error) {

        }

        if (errorLocal) {

            showToast("error", errorLocal)
        }
    }, [history]);

    function createUser(uid, email) {
        return new Promise((resolve, reject) => {
            axios({
                method: "POST",
                url: serverUrl + '/adduser',
                data: {
                    uid: uid,
                    email: email,
                },
            }).then(response => {
                if (response.status === 200) {
                    resolve("user created")

                }
            }).catch(function (error) {
                if (error.response) {

                    reject('something went wrong')
                }
            });
        })

    }

    function showToast(toastType, toastMessage) {
        setToastStatus({
            toastType: toastType,
            toastMessage: toastMessage,
            date: Date()
        })
    }

    const gBtnLogin = useCallback(
        async event => {
            event.preventDefault();
            try {
                await firebaseApp
                    .auth()
                    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
                    .then(function () {
                        return firebase.auth().signInWithPopup(provider).then(function (result) {
                            // This gives you a Google Access Token. You can use it to access the Google API.
                            // var token = result.credential.accessToken;
                            // The signed-in user info.
                            var user = result.user;
                            createUser(user.uid, user.email);
                            history.push("/");

                            //
                            // ...
                        }).catch(function (error) {
                            // Handle Errors here.
                            // var errorCode = error.code;
                            // var errorMessage = error.message;
                            // The email of the user's account used.
                            // var email = error.email;
                            // The firebase.auth.AuthCredential type that was used.
                            // var credential = error.credential;
                            // ...

                            showToast("error", error.message)

                        });
                    })
                    .catch(function (error) {
                        // Handle Errors here.
                        // var errorCode = error.code;
                        // var errorMessage = error.message;
                        // The email of the user's account used.
                        // var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        // var credential = error.credential;
                        // ...

                    });
                history.push("/");
            } catch (error) {

            }
        },
        [history]
    );

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                //
                //
                history.push('/')
            } else {
                //
            }
        })
    })

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Grid container direction={'column'} alignItems={'center'} alignContent={'center'}>

                <Grid item>
                    <Typography variant={'h1'} className={classes.appName}>eFile Buddy</Typography>
                </Grid>
                <Grid item>
                    <Typography className={classes.subtitle}>easy 1099s</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h4" className={classes.title}>Sign Up</Typography>
                </Grid>
                <Grid item xs={6} xl={6}>
                    <form className={classes.form} noValidate onSubmit={handleSignUpNew}>
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
                            error={errorForm}
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
                            Sign Up
                        </Button>
                        {/*<Grid item xs>*/}
                        {/*    <Link href="#" variant="body2">*/}
                        {/*        Forgot password?*/}
                        {/*    </Link>*/}
                        {/*</Grid>*/}
                        <Grid item>
                            <Button onClick={() => {
                                history.push('/login/')
                            }}>
                                {"Have an account? Sign In"}
                            </Button>
                            <GoogleButton onClick={gBtnLogin} className={classes.gglBtn}/>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
            {toastStatus ? <Toast key={toastStatus.date}
                                  toastStatus={toastStatus}/> : null}

        </div>
    );


};

export default withRouter(SignUp);

const useStyles = makeStyles(theme => ({
    root: {
        background: "linear-gradient(#1f69fe, #02bde6)",
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
        backgroundColor: 'white',
        color: 'blue',
        marginTop: 20

    }
}));
