import React from 'react';
import Grid from "@material-ui/core/Grid";
import loadingGif from "../../assets/loadingGreen.gif";
import Fade from "@material-ui/core/Fade";

const LoadingScreen = () => {
    return (
        <div>
            <Grid container justify={'center'} direction={"column"} alignContent={"center"}
                  alignItems={"center"}>
                <Fade>
                    <Grid item>
                        <img src={loadingGif}
                             alt={'loading gif'}/>
                    </Grid>
                </Fade>
            </Grid>
        </div>
    );
};

export default LoadingScreen;
