import {useEffect} from 'react';
import {useHistory} from "react-router";
import firebase from "firebase/app";

/**
 * Protects a route from users that are not authorized by kicking them out if they bookmarked the page for example
 */
export default function useProtectRoute() {
    let history = useHistory()
    const user = firebase.auth().currentUser;

    useEffect(() => {
        if (!user) {
            history.push('/login')
        }
    }, [])
}
