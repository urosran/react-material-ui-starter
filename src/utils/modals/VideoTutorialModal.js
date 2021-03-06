import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";


const VideoTutorial = ({
                           openModal,
                           setOpenModal,
                           screenHeight,
                           screenWidth,
                            youtubeEmbedUrl
                       }) => {


    return (
            <Dialog
                open={openModal}
                aria-labelledby="alert-dialog-slide-title"
                onBackdropClick={() => setOpenModal(false)}
                style={{
                    width: '100%',
                    height: '100%'
                }}
                fullWidth={true}
                maxWidth={"xl"}
            >
                <DialogTitle id="dialog-title">Tutorial</DialogTitle>
                <DialogContent style={{display: "flex", justifyContent: "center"}}>
                    <div>
                        <iframe
                            width={screenWidth - (screenWidth * 0.3)}
                            height={screenHeight - (screenHeight * 0.5)}
                            src={youtubeEmbedUrl}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
    );
};

export default VideoTutorial

VideoTutorial.propTypes={
    openModal: PropTypes.string.isRequired,
    setOpenModal: PropTypes.func.isRequired,
    screenHeight: PropTypes.string.isRequired,
    screenWidth: PropTypes.string.isRequired,
    youtubeEmbedUrl: PropTypes.string.isRequired
}

