import axios from "axios";
import {serverUrl} from "../config";
import {enums} from "./enums";
import firebaseApp from "../Firebase/firebaseApp";
import PropTypes from 'prop-types';

export function getArrayOfObjectsWithRemovedItem(array, itemPropertyName, itemPropertyValueToDelete) {
    return array.filter(object => {
        return object[itemPropertyName] !== itemPropertyValueToDelete
    })
}

export function sortArrayByNumericObjectProperty(array, objectProperty) {
    return array.sort((a, b) => {

        return (+a[objectProperty]) > (+b[objectProperty]) ? 1 : -1
    })
}

export function showToast(toastType, toastMessage, setToastStatus) {
    setToastStatus({
        toastType: toastType,
        toastMessage: toastMessage,
        date: Date()
    })
}

export async function updateUserInDb(dispatch, updatedClient, currentUsersIdToken) {
    console.log("About to update client in db")
    dispatch({showLoadingGif: true})

    return new Promise((res, rej) => {
        axios({
            method: "POST",
            url: serverUrl + '/updateUserInDb',
            data: {
                userObject: updatedClient,
                authToken: currentUsersIdToken,
            },
            headers: {
                'crossDomain': true,
            }
        }).then(response => {
            dispatch({showLoadingGif: false})
            dispatch({loadingBarProgress: 100})

            res(response.status)
        }).catch(function (error) {
            if (error.response) {
                dispatch({loadingBarProgress: 100})
                dispatch({showLoadingGif: false})

                rej("Something went wrong")
            }
        });

    })
}

export async function addAccountantsClientToDb(userDataObject, accountantsClientInformation, listOfUsersClients, dispatch) {
    console.log("about to call axios")
    return new Promise((resolve, reject) => {
        dispatch({showLoadingGif: true})
        axios({
            method: "POST",
            url: serverUrl + '/createAccountantsClientUser',
            data: {
                accountantsClientInformation: accountantsClientInformation,
                accountantInformation: userDataObject
            }
        }).then(response => {
            if (response.status === 200) {
                let newClient = accountantsClientInformation
                newClient.uid = response.data.accountantClientUid

                listOfUsersClients.push(newClient)
                console.log(newClient)
                dispatch({listOfUsersClients: listOfUsersClients})
                dispatch({loadingBarProgress: 100})
                dispatch({shouldOpenAddClientModal: false})
                dispatch({showLoadingGif: false})

                resolve(response.status)
            }
        }).catch(function (error) {
            if (error.response) {
                dispatch({loadingBarProgress: 100})
                dispatch({addAccountantsClient: false})
                dispatch({showLoadingGif: false})

                reject()
            }
        });
    })
}

export function addContractorToDb(newContractor, userDataObject, listOfUsersClients, dispatch) {
    return new Promise((resolve, reject) => {
        console.log(userDataObject)
        dispatch({loadingBarProgress: 40})
        dispatch({showLoadingGif: true})
        axios({
            method: "POST",
            url: serverUrl + '/createContractor',
            data: newContractor,
        }).then(response => {
            if (response.data.status === 500) {
                dispatch({loadingBarProgress: 100})
                dispatch({addContractor: false})
                showToast("error", response.data.message)
            } else if (response.status === 200) {
                newContractor.uid = response.data.contractorUid
                console.log(newContractor)
                listOfUsersClients.push(newContractor)
                console.log(listOfUsersClients)
                userDataObject.contractors.push(response.data.contractorUid)
                dispatch({listOfUsersClients: listOfUsersClients})
                dispatch({userDataObject: userDataObject})
                dispatch({loadingBarProgress: 100})
                dispatch({addContractor: false})
                dispatch({shouldOpenAddClientModal: false})
                dispatch({showLoadingGif: false})
                resolve(response.status)
            }
        }).catch(function (error) {
            if (error.response) {
                dispatch({loadingBarProgress: 100})
                dispatch({addContractor: false})
                dispatch({showLoadingGif: false})
                reject()
            }
        });
    })
}

export async function setUserDataGlobally(dispatch) {
    console.log("current user")
    console.log(firebaseApp.auth().currentUser.uid)
    return new Promise(async (resolve, reject) => {
        axios({
            method: "POST",
            url: serverUrl + '/getUserData',
            data: {authToken: await firebaseApp.auth().currentUser.getIdToken()},
        }).then(response => {
            if (response.status === 200) {
                console.log("data fetched")
                dispatch({userDataObject: response.data.userDataObject})
                dispatch({listOfUsersClients: response.data.listOfUsersClients})
                dispatch({loadingBarProgress: 100})
                resolve(response.data.userDataObject)
            }
        }).catch(function (error) {
            dispatch({loadingBarProgress: 100})
            console.log(error)
            reject()
        })
    });
}

