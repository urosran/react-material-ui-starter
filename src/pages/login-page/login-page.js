import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
// import CustomMenu from "../sharedComponents/CustomMenu";
import {useAutocomplete, useTheme} from "@mui/material";
import GoogleButton from "react-google-button";
import {useCallback, useContext, useEffect, useState} from "react";
import {getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {useNavigate} from "react-router-dom";

export function LoginPage() {
    const provider = new GoogleAuthProvider();
    const theme = useTheme();
    const auth = getAuth()
    const [checked, setChecked] = React.useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const handleCheckbox = (event) => {
        setChecked(event.target.checked);
    };
    const navigate = useNavigate()

    const [showError, setShowError] = useState(false)
    // const {dispatch} = useContext(AppContext);

    useEffect(() => {
        const loginFunction = async () => {
            auth.onAuthStateChanged(function (user) {
                console.log(user===true)
                if (user) {
                    console.log('navigating to dash')
                    navigate('dashboard')
                }
            });
        };
        loginFunction();
    }, [])


    function handleLoginGoogle() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
                navigate('dashboard')
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    function handleLoginEmailPassword() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                console.log('signed in')
                navigate('dashboard')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant={"h1"}>
                            <strong>Sign In</strong>
                        </Typography>
                        <Grid item xs={12}>
                            <Grid container spacing={2} alignItems={"center"} alignContent={"center"}
                                  justifyContent={"center"}
                                  sx={{mb: 6, mt: 3}}>
                                <GoogleButton
                                    onClick={() => handleLoginGoogle()}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type={checked ? "text" : "password"}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid container alignItems={"center"} alignContent={"center"} justifyContent={"center"}>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" justifyContent="flex-start">
                                    <FormControlLabel
                                        control={<Checkbox
                                            checked={checked}
                                            onChange={handleCheckbox}
                                            inputProps={{'aria-label': 'controlled'}}
                                        />}
                                        label="Show Password"
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            style={{color: "white", backgroundColor: theme.palette.primary.blue, borderRadius: "22px"}}
                            onClick={() => handleLoginEmailPassword()}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}
