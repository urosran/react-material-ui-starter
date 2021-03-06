import React, {useContext, useEffect, useState} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import UserInformationForm from "./UserInformationForm";
import {AppContext} from "../../context/AppContext";
import PropTypes from "prop-types";
import loadingGif from '../../assets/loadingGreen.gif'
import '../animations.css'

const AddClientModal = ({
                            showToast,
                            clientTypeToAdd,
                            title,
                            onSubmitHandlerFunction,
                        }
) => {
    const {state: {shouldOpenAddClientModal, canSubmitAddClientForm, showLoadingGif}, dispatch} = useContext(AppContext);
    const [clientObject, setClientObject] = React.useState(null);

    function setShouldOpenAddAccountantsModal(shouldOpen) {
        console.log("closing")
        dispatch({shouldOpenAddClientModal: shouldOpen})
    }

    return (
        <div>
            <Dialog

                style={{minWidth: '90vw'}} open={shouldOpenAddClientModal}
                onClose={() => setShouldOpenAddAccountantsModal(false)}
                aria-labelledby="form-dialog-title">
                <section className={'loading_box'} wobble={1}>
                    <DialogTitle id="form-dialog-title"><strong>{title}</strong></DialogTitle>
                    <DialogContent >
                        <DialogContentText>
                            * required fields
                        </DialogContentText>
                        {!showLoadingGif
                        &&
                        <UserInformationForm showToast={showToast}
                                             clientTypeToAdd={clientTypeToAdd}
                                             setClientObject={setClientObject}
                        />
                        }
                        {showLoadingGif
                        &&
                        <img src={loadingGif}
                             alt={'loading_gif'}
                             style={{width: 200}}
                        />}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShouldOpenAddAccountantsModal(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button
                            disabled={canSubmitAddClientForm}
                            onClick={() => {
                                onSubmitHandlerFunction(clientObject)
                                // dispatch(contextTriggerFieldToUpdate)
                            }}
                            variant={'contained'}
                            color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </section>
            </Dialog>
        </div>

    );
};

export default AddClientModal;

AddClientModal.propTypes = {
    showToast: PropTypes.func.isRequired,
    onSubmitHandlerFunction: PropTypes.func.isRequired,
    clientTypeToAdd: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    contextTriggerFieldToUpdate: PropTypes.object.isRequired,

};
