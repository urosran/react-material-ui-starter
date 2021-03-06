import React, {useContext, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useGetUserData from "../../utils/hooks/useGetUserData";
import {AppContext} from "../../context/AppContext";
import Typography from "@material-ui/core/Typography";
import Menu from "../Menu/Menu";
import useProtectRoute from "../../utils/hooks/useProtectRoute";
import AppBarSpacer from "../../utils/sharedComponents/AppBarSpacer";
import UserInformationForm from "../../utils/modals/UserInformationForm";
import Toast from "../../utils/sharedComponents/Toast";
import {updateUserInDb} from "../../utils/sharedFunctions";
import Button from "@material-ui/core/Button";
import firebaseApp from "../../Firebase/firebaseApp";
import MenuListItems from "./menuListItems";

const UserProfile = () => {
    const classes = useStyles();
    const {state: {userDataObject}, dispatch} = useContext(AppContext);
    const [toastStatus, setToastStatus] = useState(null);
    const [clientObject, setClientObject] = useState(null);

    useProtectRoute()
    useGetUserData()

    async function handleChangeInformation() {
        console.log('andle change')
        dispatch({loadingBarProgress: 40})
        await updateUserInDb(dispatch, clientObject, await firebaseApp.auth().currentUser.getIdToken())
        dispatch({loadingBarProgress: 100})
    }

    function showToast(toastType, toastMessage) {
        setToastStatus({
            toastType: toastType,
            toastMessage: toastMessage,
            date: Date()
        })
    }

    function determineMenuList() {
        return <MenuListItems/>
    }

    return (
        <div>
            <Menu listOfItemsToRender={determineMenuList()}/>
            <AppBarSpacer/>
            {userDataObject &&
            <Grid container direction={"column"} alignContent={"center"} alignItems={"center"} justify={"center"}>
                <Grid item>
                    <Typography variant={"h2"}>Profile </Typography>
                </Grid>
                {console.log(userDataObject, "before userInfoForm")}
                <Grid item xs={8}>
                    <UserInformationForm showToast={showToast}
                                         clientTypeToAdd={userDataObject.accountType}
                                         setClientObject={setClientObject}
                                         existinguserDataObject={userDataObject}
                    />
                </Grid>

                <Grid item>
                    <Button variant={"contained"} color={"primary"} onClick={() => handleChangeInformation()}>
                        Change information</Button>
                </Grid>

            </Grid>
            }
            {toastStatus ? <Toast key={toastStatus.date} toastStatus={toastStatus}/> : null}
        </div>
    );
};

export default UserProfile;

const useStyles = makeStyles((theme) => ({}));

