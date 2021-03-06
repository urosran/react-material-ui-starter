import React from 'react';
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';


const HowItWorksCard = ({title, imgSrc, description}) => {
    const classes = useStyles();

    return (
        <Grid container direction={"column"} alignContent={"center"} alignItems={"center"} justify={"center"}
              className={classes.cardContainer}>
            <Grid item xs={12}>
                <Typography variant={"h4"}><strong>{title}</strong></Typography>
            </Grid>
            <Grid item xs={12}>
                <img className={classes.img} alt={'accountant benefit'} src={'./' + imgSrc}/>
            </Grid>
            <Grid item className={classes.description} xs={12}>
                <Typography variant={"body1"}>{description}</Typography>
            </Grid>
        </Grid>
    );
};

export default HowItWorksCard;

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        // maxHeight: '60vh',
        textAlign: 'center'
    },
    img: {
        maxWidth: '70%',
        margin: 30
    },
    description: {
        padding: theme.spacing(2)
    }


}));

HowItWorksCard.propTypes = {
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}
