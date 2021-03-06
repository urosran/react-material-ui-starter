import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/core/styles';
import {AppContextProvider} from "./context/AppContext";
import {Switch} from "react-router";
import LoadingScreen from "./utils/sharedComponents/LoadingScreen";
import HomePage from "./Views/HomePage/HomePage";
import UserProfile from "./Views/CommonComponents/UserProfile";

const SignUpCool = lazy(() => import( "./Views/LoginScreens/SignUp"))
const Login = lazy(() => import( "./Views/LoginScreens/Login"))
const ResetPassword = lazy(() => import("./Views/LoginScreens/ResetPassword"))
const AccountantsDashboard = lazy(() => import  ("./Views/Dashboard/Dashboard"))


const App = () => {

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    primary: {
                        // light: will be calculated from palette.primary.main,
                        main: 'blue',
                        contrastText: '#ffffff'
                        // dark: will be calculated from palette.primary.main,
                        // contrastText: will be calculated to contrast with palette.primary.main
                    },
                    secondary: {
                        main: '#1B8EB1'
                    },
                    neutral:{
                        main: '#ffffff',
                        gray: '#f4f6f6'
                    }
                },
                typography: {
                    fontFamily: "Comfortaa, calibri",
                    h1: {
                        fontSize: '3rem'
                    },
                    h2: {
                        fontSize: '2.8rem'
                    },
                    h3: {
                        fontSize: '2rem'
                    },
                    h4: {
                        fontSize: '1.5rem'
                    },
                },
                action: {
                    hover: '#1B8EB1',
                    active: '#1B8EB1',

                }
            })
    )

    return (
        <AppContextProvider>
            <ThemeProvider theme={responsiveFontSizes(theme)}>
                <div className={"App"}>
                    <Router>
                        <Suspense fallback={<LoadingScreen/>}>
                            <Switch>
                                <Route exact path="/" render={() => (<HomePage/>)}/>
                                <Route exact path="/login" render={() => (<Login/>)}/>
                                <Route exact path="/signup" render={() => (<SignUpCool/>)}/>
                                {/*<Route exact path="/:uid/profile" render={() => <UserProfile/>}/>*/}
                                <Route exact path="/dashboard" render={() => <AccountantsDashboard/>}/>
                                <Route exact path="/resetPassword" render={() => (<ResetPassword/>)}/>
                            </Switch>
                        </Suspense>
                    </Router>
                </div>
            </ThemeProvider>
        </AppContextProvider>
    )
};

export default App;
