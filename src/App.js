import {
    Route,
    Routes,
    Navigate,
    useLocation,
} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import React, {useState} from "react";
import {getApp} from "firebase/app";
import {authDomain} from "./services/config";
import {initializeApp} from "@firebase/app";
import {BrowserRouter} from 'react-router-dom';

//pages imports
import {LoginPage} from "./pages/login-page/login-page";
import {DashboardPage} from "./pages/dashboard-page/dashboard-page";


function App() {
    const firebaseApp = initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: authDomain,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_SENDER_ID,
    });
    const auth = getAuth(firebaseApp);
    // TODO: change loggedIn  to true to avoid auth in dev
    const [loggedIn, setLoggedIn] = useState(false)
    // const location = useLocation();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoggedIn(true)
        }
    })

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {loggedIn ?
                        <>
                            <Route path="/login" element={<LoginPage/>}/>
                            {/*<Route path="/signup" element={<SignUpPage/>}/>*/}
                            <Route path="/dashboard" element={<DashboardPage/>}/>
                            <Route path="*" element={<Navigate to="/dashboard"/>}/>
                        </>
                        :
                        <>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="*" element={<Navigate to="/login"/>}/>
                        </>
                    }
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
