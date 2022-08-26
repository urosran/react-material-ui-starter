import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
// import CustomMenu from "../sharedComponents/CustomMenu";
import {useAutocomplete, useTheme} from "@mui/material";
import {useCallback, useContext, useEffect, useState} from "react";
import {getAuth, signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";


export function HomePage() {

    const theme = useTheme();
    const auth = getAuth()
    const navigate = useNavigate()

    const [checked, setChecked] = React.useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const handleCheckbox = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div>
            {/*<CustomMenu/>*/}
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Button onClick={() => {
                        navigate('/login')
                    }}>
                        Login
                    </Button>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant={"h1"}>
                            <strong>Homepage</strong>
                        </Typography>

                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}
