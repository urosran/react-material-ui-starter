import React from 'react';
import firebase from "firebase";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router";
import PropTypes from 'prop-types';

const SignUpForm = ({showToast, color}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const classes = useStyles();
    const history = useHistory();

    async function handleGetStarted() {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            history.push('createaccount')
        } catch (e) {
            showToast('error', e.message)
        }
    }

    return (
        <div>
            <Grid className={classes.getStartedBox} style={color==='black'?{background:'#292D2C 0% 0% no-repeat padding-box'}:{}} container >
                <TextField
                    autoFocus
                    color={"primary"}
                    InputLabelProps={color === 'black' ? {style: {color: 'black'}} : {}}
                    inputProps={color === 'black' ? {style: {color: "white"}} : {}}
                    style={color === 'black' ? {color: 'white', margin: 10, backgroundColor: 'white'} : {}}
                    margin="dense"
                    id="clientsName"
                    label="Email"
                    type="text"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="dense"
                    InputLabelProps={color === 'black' ? {style: {color: 'black'}} : {}}
                    inputProps={color === 'black' ? {style: {color: "white"}} : {}}
                    style={color === 'black' ? {color: 'white', margin: 10, backgroundColor: 'white'} : {}}
                    id="clientsLastName"
                    label="Password"
                    type="password"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button fullWidth className={classes.getStartedButton} variant={"contained"}
                        onClick={() => handleGetStarted()}>Get Started</Button>
            </Grid>
        </div>
    );
};

export default SignUpForm;

const useStyles = makeStyles((theme) => ({
    getStartedContainer: {
        backgroundColor: theme.palette.primary.light,
        padding: theme.spacing(2),
        minHeight: '80vh'
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
}))

SignUpForm.propTypes={
    showToast: PropTypes.func.isRequired,
    color: PropTypes.string
}
