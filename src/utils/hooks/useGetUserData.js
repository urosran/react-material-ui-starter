import {useContext, useEffect} from 'react';
import firebaseApp from "../../Firebase/firebaseApp";

import {AppContext} from "../../context/AppContext";
import {setUserDataGlobally} from "../sharedFunctions";

export default function useGetUserData() {
    const {state: {userDataObject}, dispatch} = useContext(AppContext);

    useEffect(() => {
        if (!userDataObject && !userDataObject && firebaseApp.auth().currentUser) {
            console.log("Getting data from DB")
            dispatch({loadingBarProgress: 40})
            setUserDataGlobally()
        }
    });
}
