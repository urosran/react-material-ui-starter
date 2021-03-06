import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const AppBarSpacer = () => {
    const classes = useStyles();

    return (
        <div className={classes.appBarSpacer}/>
    );
};

export default AppBarSpacer;

const useStyles = makeStyles(theme => ({
    appBarSpacer: theme.mixins.toolbar,
}))
