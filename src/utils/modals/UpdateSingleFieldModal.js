import React, {useContext, useEffect, useState} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import PropTypes, {func} from "prop-types";
import loadingGif from '../../assets/loadingGreen.gif'
import {AppContext} from "../../context/AppContext";
import TextField from "@material-ui/core/TextField";

const UpdateSingleFieldModal = ({
                                    title,
                                    shouldOpenUpdateFieldModal,
                                    setShouldOpenUpdateFieldModal,
                                    initialValue,
                                    setInitialValue,
                                    handleSubmit,
                                    label,
                                    typeToBeInputted,
                                    errorText,
                                    multiline
                                }
) => {
    const {state: {showLoadingGif}} = useContext(AppContext);
    const [showError, setShowError] = useState(false);

    function standardizeInput(e) {
        let newValue = e.target.value
        let isInputNumber = !isNaN(parseFloat(newValue))
        if (isInputNumber && typeToBeInputted === 'number') {
            console.log('floating')
            console.log(parseFloat(newValue))
            return newValue
        } else {
            return newValue
        }
    }

    function isInputValid() {
        setShowError(false)
        console.log(typeof initialValue)
        console.log(parseFloat(initialValue))
        let isInputNumber = !isNaN(parseFloat(initialValue))
        console.log(isInputNumber)
        if (isInputNumber && typeToBeInputted === 'number') {
            setShowError(false)
            console.log(parseFloat(initialValue))
            return true
        } else if (typeToBeInputted === 'string') {
            setShowError(false)
            return true
        } else {
            setShowError(true)
            return false
        }
    }

    function validateAndSubmit() {
        if (isInputValid()) {
            handleSubmit()
        }
    }

    return (
        <div>
            <Dialog open={shouldOpenUpdateFieldModal} onClose={() => setShouldOpenUpdateFieldModal(false)}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><strong>{title}</strong></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        * required fields
                    </DialogContentText>
                    {!showLoadingGif
                    &&
                    <TextField
                        margin="dense"
                        error={showError}
                        helperText={showError ? errorText : ''}
                        id="changeableField"
                        label={label}
                        type="text"
                        fullWidth
                        multiline={multiline}
                        rowsMax={multiline ? 4 : 1}
                        required
                        autoFocus
                        value={initialValue}
                        onChange={(e) => {
                            setInitialValue(standardizeInput(e))
                        }}
                    />
                    }
                    <img src={loadingGif}
                         alt={'loading_gif'}
                         style={!showLoadingGif ? {display: "none"} : {width: 50, height: 50}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShouldOpenUpdateFieldModal(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            validateAndSubmit()
                        }}
                        variant={'contained'}
                        color="primary">
                        Change
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
};

export default UpdateSingleFieldModal;

UpdateSingleFieldModal.propTypes = {
    title: PropTypes.string.isRequired,
    setShouldOpenUpdateFieldModal: PropTypes.bool.isRequired,
    initialValue: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    typeToBeInputted: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    setInitialValue: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};
