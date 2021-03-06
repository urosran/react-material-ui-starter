import React, {useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import {enums} from "../enums";
import PropTypes from 'prop-types';
import firebaseApp from "../../Firebase/firebaseApp";
import {makeStyles} from "@material-ui/core/styles";


const UserInformationForm = ({showToast, clientTypeToAdd, existinguserDataObject, setClientObject}) => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [ein, setEin] = React.useState('');
    const [addressLine1, setAddressLine1] = React.useState('');
    const [addressLine2, setAddressLine2] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [zipCode, setZipCode] = React.useState('');
    const [country, setCountry] = React.useState('');
    const classes = useStyles();


    //<editor-fold desc="Effects">
    useEffect(() => {
        console.log(existinguserDataObject)
        console.log('user form')
        // If fields are already present set them
        if (existinguserDataObject) {
            setFirstName(existinguserDataObject.firstName)
            setLastName(existinguserDataObject.lastName)
            setEmail(existinguserDataObject.email)
            setEin(existinguserDataObject.ein)
            setPhone(existinguserDataObject.phone)
            setAddressLine1(existinguserDataObject.addressLine1)
            setAddressLine2(existinguserDataObject.addressLine2)
            setCity(existinguserDataObject.city)
            setState(existinguserDataObject.state)
            setZipCode(existinguserDataObject.zipCode)
            setCountry(existinguserDataObject.country)
        }
    }, [existinguserDataObject])


    useEffect(() => {
        // every time one of the fields in the form is typed into set the object in the parent
        let client = {}
        if (existinguserDataObject) {
            client = existinguserDataObject
            client.firstName = firstName
            client.lastName = lastName
            client.email = email
            client.phone = phone
            client.ein = ein
            client.addressLine1 = addressLine1
            client.addressLine2 = addressLine2
            client.city = city
            client.state = state
            client.zipCode = zipCode
            client.country = country
            setClientObject(client)
        }else{
            setClientObject(createObjectForClientType())
        }
    }, [firstName, lastName, email, phone, ein, addressLine1, addressLine2,
        city, state, zipCode, country])

    // useEffect(() => {
    //     if (!firstName || !lastName || !email) {
    //         dispatch({canSubmitAddClientForm: true})
    //     } else {
    //         dispatch({canSubmitAddClientForm: false})
    //     }
    // }, [firstName, lastName, email])
    //
    // useEffect(() => {
    //     // Since this is a reusable component to create a contractor and the accountants client we take the
    //     // yes create the client from the parent modal
    //     addAccountantsClient
    //     && addClientToDb()
    // }, [addAccountantsClient])
    //
    // useEffect(() => {
    //     // Since this is a reusable component to create a contractor and the accountants client we take the
    //     // yes create the client from the parent modal
    //     addContractor
    //     && addContractorToDb()
    // }, [addContractor])


    //</editor-fold>

    //<editor-fold desc="Server Calls">


    //</editor-fold>

    function createObjectForClientType() {
        // when we are rendering the information form we have to pass in the type of the client we are trying to create
        // and this method creates an object based on that fact using the information from the form
        console.log("Creating client")
        if (clientTypeToAdd === enums.ACCOUNTANTS_CLIENT) {
            let client = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                ein: ein,
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                city: city,
                contractors: [],
                state: state,
                zipCode: zipCode,
                country: country,
                phone: phone,
                //TODO: ATTENTION!!! this is defaulting and if we reuse it for updates it will overwrite whatever is in the DB
                filed: 'No',
                paid: 0,
                remindersSent: 0,
                accountType: enums.ACCOUNTANTS_CLIENT,
                clientNotes: ''
            }
            console.log("New client: ", client)
            return client
        } else if (clientTypeToAdd === enums.CONTRACTOR) {
            return {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                ein: ein,
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                city: city,
                state: state,
                zipCode: zipCode,
                country: country,
                filed: 'No',
                paid: 0,
                remindersSent: 0,
                accountantClientUid: firebaseApp.auth().currentUser ? firebaseApp.auth().currentUser.uid : undefined,
                accountType: enums.CONTRACTOR,
                clientNotes: ''
            }
        } else {
            throw new Error("Something went wrong, got client type that is unaccounted for")
        }
    }

    // function addClientToDb() {
    //     if (
    //         firstName === "" ||
    //         lastName === "" ||
    //         email === ""
    //         // eIN === "" ||
    //         // address === "" ||
    //         // city === "" ||
    //         // state === "" ||
    //         // zip === "" ||
    //         // country === ""
    //     ) {
    //         dispatch({addAccountantsClient: false})
    //         showToast("error", "One of the required fields is empty, please try again")
    //     } else {
    //         dispatch({loadingBarProgress: 40})
    //         // TODO: The email will need to generated and sent to the client asking them to onboard
    //
    //         switch (clientTypeToAdd) {
    //             case enums.ACCOUNTANTS_CLIENT: {
    //                 console.log("adding accountants client")
    //                 addAccountantsClientToDb()
    //                 break;
    //             }
    //             case enums.CONTRACTOR: {
    //                 console.log("adding contractor")
    //                 addContractorToDb()
    //                 break;
    //             }
    //             default: {
    //                 throw new Error("No case specified for role passed in")
    //             }
    //         }
    //     }
    // }

    return (
        <div>
            <form>
                <TextField
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    type="text"
                    fullWidth
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="email"
                    label="Email"
                    type="text"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="phone"
                    label="Phone"
                    type="text"
                    fullWidth

                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="eIN"
                    label="EIN"
                    type="text"
                    fullWidth

                    value={ein}
                    onChange={(e) => setEin(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="address"
                    label="Address"
                    type="text"
                    fullWidth

                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="addres2"
                    label="Address2"
                    type="text"
                    fullWidth

                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="city"
                    label="City"
                    type="text"
                    fullWidth

                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="state"
                    label="State"
                    type="text"
                    fullWidth

                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="zip"
                    label="Zip"
                    type="text"
                    fullWidth

                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="country"
                    label="Country"
                    type="text"
                    fullWidth

                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </form>

        </div>
    );
};

export default UserInformationForm;

const useStyles = makeStyles(theme => ({}))


UserInformationForm.propTypes = {
    clientTypeToAdd: PropTypes.string.isRequired,
    setClientObject: PropTypes.func.isRequired,
};

