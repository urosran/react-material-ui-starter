import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {AppContext} from "../../context/AppContext";
import {useHistory} from "react-router";
import Fade from "@material-ui/core/Fade";
import {enums} from "../../utils/enums";
import PropTypes, {func} from "prop-types";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";


export default function UserTableOverview({accountTypeViewing, setShouldOpenUpdateAmountModal, setClientUidToChange, sendReminderEmail}) {

    const history = useHistory()
    const classes = useStyles();
    const {state: {listOfUsersClients}, dispatch} = useContext(AppContext);
    const [valuePaid, setValuePaid] = useState(0)

    useEffect(() => {

    })

    function getListOfUsersToRender() {
        if (accountTypeViewing === enums.ACCOUNTANT) {
            return listOfUsersClients
        } else if (accountTypeViewing === enums.ACCOUNTANTS_CLIENT) {
            return listOfUsersClients
        }
    }

    function calculateTotalPaidAmount() {
        let totalAmountPaid = 0
        getListOfUsersToRender().forEach(client => totalAmountPaid += parseFloat(client.paid))
        return totalAmountPaid
    }

    function routeToPage(clientRow) {
        if (accountTypeViewing === enums.ACCOUNTANT) {
            history.push("/aclient/" + clientRow.uid)
        } else if (accountTypeViewing === enums.ACCOUNTANTS_CLIENT) {
            history.push("/contractor/" + clientRow.uid)
        }
    }

    function getValuePaid(amountPaid) {
        if (amountPaid.target) {
            //TODO: on click away send to server?
            return amountPaid
        } else {
            return amountPaid
        }
    }

    return (
        <React.Fragment>
            <Fade in={true} timeout={2000}>
                <div>
                    <TableContainer component={Paper} style={{marginTop: 40}}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Name</strong></TableCell>
                                    {/*<TableCell align="left"><strong>Last Name</strong></TableCell>*/}
                                    <TableCell align="left"><strong>Email</strong></TableCell>
                                    <TableCell align="left"><strong>EIN</strong></TableCell>
                                    <TableCell align="left"><strong>Filed</strong></TableCell>
                                    {enums.ACCOUNTANTS_CLIENT === accountTypeViewing &&
                                    <TableCell align="left"><strong>Paid</strong></TableCell>}
                                    {enums.ACCOUNTANT === accountTypeViewing &&
                                    <TableCell align="left"><strong>Pending</strong></TableCell>}
                                    <TableCell align="left"><strong>Reminders Sent</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getListOfUsersToRender().map((clientRow) => (
                                    <TableRow key={clientRow.uid}>
                                        {/*<TableCell component="th" scope="row">*/}
                                        {/*    <a className={classes.textLink} onClick={() => routeToPage(clientRow)}>*/}
                                        {/*        {clientRow.firstName}</a></TableCell>*/}
                                        <TableCell align="left"><a className={classes.textLink}
                                                                   onClick={() => routeToPage(clientRow)}>
                                            {clientRow.firstName + " " + clientRow.lastName}</a></TableCell>
                                        <TableCell align="left">{clientRow.email}</TableCell>
                                        <TableCell align="left">{clientRow.ein}</TableCell>
                                        <TableCell align="left">{clientRow.filed}</TableCell>
                                        {/*<TableCell align="right"><TextField client-uid={clientRow.uid}*/}
                                        {/*                                    value={clientRow.paid}*/}
                                        {/*                                    onChange={(e) => handleChangeForAmountPaid}/></TableCell>*/}
                                        {enums.ACCOUNTANTS_CLIENT === accountTypeViewing &&
                                        <Tooltip title={'click to edit'} placement={"top"}>
                                            <TableCell align="left"
                                                       className={classes.textLink && classes.amount}
                                                       client-uid={clientRow.uid}
                                                       onClick={(e) => {
                                                           setClientUidToChange(e.currentTarget.getAttribute('client-uid'))
                                                           setShouldOpenUpdateAmountModal(true);
                                                       }}>${clientRow.paid}</TableCell>
                                        </Tooltip>}
                                        {enums.ACCOUNTANT === accountTypeViewing &&
                                        <TableCell align="left">{clientRow.filed}</TableCell>}
                                        <TableCell align="left">{clientRow.remindersSent}</TableCell>
                                        {
                                            accountTypeViewing === enums.ACCOUNTANT &&
                                            <TableCell align="left"><Button size={"small"} variant={'outlined'}
                                                                            className={classes.remindBtn}>Remind to
                                                file</Button></TableCell>
                                        }
                                        {
                                            accountTypeViewing === enums.ACCOUNTANTS_CLIENT &&
                                            <TableCell align="left">
                                                <Button size={"small"}
                                                        variant={'outlined'}
                                                        className={classes.remindBtn}
                                                        onClick={() => sendReminderEmail(clientRow, enums.CONTRACTOR, dispatch)}
                                                >
                                                    Request W9
                                                </Button></TableCell>
                                        }

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/*TODO check spanning table to fix the alignment and not have to create two tables https://material-ui.com/components/tables/#spanning-table*/}
                    <TableContainer component={Paper} style={{marginTop: 40}}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {enums.ACCOUNTANT === accountTypeViewing &&
                                    <TableCell><strong>Total Clients</strong></TableCell>}
                                    {enums.ACCOUNTANTS_CLIENT === accountTypeViewing &&
                                    <TableCell><strong>Total Contractors</strong></TableCell>}
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"><strong>Filed</strong></TableCell>
                                    <TableCell align="right"><strong>Paid</strong></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={0}>
                                    {/*TODO Just doing the lenght is stupid there will likely be active/inactive clients*/}
                                    <TableCell component="th"
                                               scope="row">{getListOfUsersToRender().length}</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell
                                        align="right">{getListOfUsersToRender().filter((client) => client.filed === 'Yes').length}</TableCell>
                                    <TableCell align="right">${calculateTotalPaidAmount()}</TableCell>
                                    <TableCell align="right">{}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </Fade>
        </React.Fragment>

    );
}
const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
    remindBtn: {
        minWidth: '60%',
        borderColor: theme.palette.primary.light,
        color: theme.palette.primary.light,
        // color: 'white',
        margin: 10,
        borderRadius: 30
    },
    textLink: {
        textDecoration: 'underline',
        textDecorationColor: theme.palette.primary.light,
        cursor: 'pointer',
    },
    amount: {
        cursor: 'text',
    }
}))

UserTableOverview.propTypes = {
    accountTypeViewing: PropTypes.string.isRequired,
    sendReminderEmail: PropTypes.func.isRequired,
    setShouldOpenUpdateAmountModal: PropTypes.func,
    setClientUidToChange: PropTypes.func,
};
