import "date-fns";
import React from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import Navigation from "./Navigation.js";
import HomePage from "./HomePage.js";
import PropManaAfterSign from "./PropManaAfterSign.js";
import PropertyInfo from "./PropertyInfo.js";
import EditTenant from "./EditTenant";
import AddTenant from "./AddTenant";
import DeleteTenant from "./DeleteTenant";
import Submeters from "./Submeters";
import Meters from "./Meters";
import MeterBillPage from "./MeterBillPage"
import DatePicker from "./DatePicker"
import CollapseSubmeter from "./CollapseSubmeter"
import { Component } from "react";
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";

class BillingHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from_date: "",
            to_date: "",
            submeter_bill_id: '',
            bill_id: '',
            submeter_id: '',
            prior_read: '',
            current_read: '',
            amt_due: ''
        }
        this.handleFromDateChange = this.handleFromDateChange.bind(this);
        this.handleToDateChange = this.handleToDateChange.bind(this);
        this.getMeterBillList = this.getMeterBillList.bind(this);
        this.getSubmeterBillList = this.getSubmeterBillList.bind(this)
    }

    handleFromDateChange(event) {
        this.setState({
            from_date: event.target.value,
        }, () => {
            console.log(this.state.from_date);
        });
    }

    handleToDateChange(event) {
        this.setState({
            to_date: event.target.value,
        }, () => {
            console.log(this.state.to_date);
        });
    }

    getMeterBillList() {

    }

    getSubmeterBillList() {

    }

    generateTable() {
        {/**/ }
    }

    render() {
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Billing History</Typography>
                <form noValidate>
                    <table>
                        <td>
                            <TextField
                                id="from_date"
                                label="From"
                                type="date"
                                defaultValue={this.state.from_date}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.handleFromDateChange}
                            />
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <TextField
                                id="to_date"
                                label="To"
                                type="date"
                                defaultValue={this.state.to_date}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.handleToDateChange}
                            />
                        </td>
                    </table>
                </form>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Meter</TableCell>
                            <TableCell>Submeter</TableCell>
                            <TableCell>Prior Read</TableCell>
                            <TableCell>Current Read</TableCell>
                            <TableCell>Amount Due</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>101026</TableCell>
                            <TableCell></TableCell>
                            <TableCell>1234</TableCell>
                            <TableCell>2345</TableCell>
                            <TableCell>500</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>26262</TableCell>
                            <TableCell>123</TableCell>
                            <TableCell>500</TableCell>
                            <TableCell>200</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </React.Fragment>
        )
    }
}

export default BillingHistory;