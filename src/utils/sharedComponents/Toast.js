import React, {useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Toast({toastStatus: toastObject}) {
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(
        () => {
            setOpen(true);
        },
        [toastObject]
    );

    function createAlert() {
        switch (toastObject.toastType) {
            case "success":
                return <Alert onClose={handleClose} severity="success">
                    {toastObject.toastMessage}
                </Alert>;
            case "error":
                return <Alert onClose={handleClose} severity="error">
                    {toastObject.toastMessage}
                </Alert>;
            case "warning":
                return <Alert onClose={handleClose} severity="warning">
                    {toastObject.toastMessage}
                </Alert>;
            case "info":
                return <Alert onClose={handleClose} severity="info">
                    {toastObject.toastMessage}
                </Alert>;
            default:

        }
    }

    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            {createAlert()}
        </Snackbar>
    );
}
