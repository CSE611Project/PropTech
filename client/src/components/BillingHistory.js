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
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import DialogContentText from "@material-ui/core/DialogContentText";

class BillingHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            property_id: this.props.property_id,
            tenant_list: this.props.tenant_list,
            from_date: "",
            to_date: "",
            submeter_bill_id: '',
            bill_id: '',
            submeter_id: '',
            prior_read: '',
            current_read: '',
            amt_due: '',
            bill_list: [],
            submeter_bill_list: [],
            unit_charge: "",
            meter_id: this.props.meter_id
        }
        this.handleFromDateChange = this.handleFromDateChange.bind(this);
        this.handleToDateChange = this.handleToDateChange.bind(this);
        this.getMeterBillList = this.getMeterBillList.bind(this);
        this.getSubmeterBillList = this.getSubmeterBillList.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        // this.generateMeterTable();
        // this.generateSubmeterTable();
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
        return new Promise((resolve, reject) => {
            axios.get(`/history_meterbill_list/${this.state.property_id}/${this.state.from_date}/${this.state.to_date}
            `).then((response) => {
                console.log("response from database: ", response.data);
                this.setState({ bill_list: response.data }, () => {
                    console.log("bill list", this.state.bill_list);
                    resolve();
                });
            });
            //  console.log("bill list:", this.state.bill_list);
        });
    }

    getSubmeterBillList() {
        return new Promise((resolve, reject) => {
            axios.get(`/history_submeterbill_list/${this.state.property_id}/${this.state.from_date}/${this.state.to_date}
            `).then((response) => {
                console.log("response from database: ", response.data);
                this.setState({ submeter_bill_list: response.data }, () => {
                    console.log("submeter bill list", this.state.submeter_bill_list);
                    resolve();
                });
            });
            //  console.log("bill list:", this.state.bill_list);
        });
    }

    onSubmit() {
        if(this.state.from_date == "" || this.state.to_date == ""){
            alert("please select a time period");
            return;
        }
        this.generateMeterTable();
        this.generateSubmeterTable();
        console.log("bill list length:",this.state.bill_list.length);
        console.log(this.state.from_date, this.state.to_date, this.state.bill_list, this.state.submeter_bill_list)
    }

    generateMeterTable() {
        var resm = [];
        this.getMeterBillList().then(() => {
            var tableData = this.state.bill_list;
            if(tableData.length == 0){
                alert("No bills in current time period, please manually input !");
                return;
            } 
            console.log(this.state.bill_list)
            for (var i = 0; i < tableData.length; i++) {
                resm.push(
                    <TableRow key={i} id={i}>
                        <TableCell>{tableData[i].bill_id}</TableCell>
                        <TableCell>{tableData[i].meter_id}</TableCell>
                        <TableCell>{tableData[i].from_date.split("T")[0]}</TableCell>
                        <TableCell>{tableData[i].to_date.split("T")[0]}</TableCell>
                        <TableCell>{tableData[i].total_kwh_usage}</TableCell>
                        <TableCell>{tableData[i].unit_charge}</TableCell>
                        <TableCell>{tableData[i].total_charge}</TableCell>
                    </TableRow>
                );
            }
            this.resm = resm;
            this.forceUpdate();
        });
    }

    generateSubmeterTable() {
        var res = [];
        this.getSubmeterBillList().then(() => {
            var tableData = this.state.submeter_bill_list;
            
            console.log(this.state.submeter_bill_list)
            for (var i = 0; i < tableData.length; i++) {
                res.push(
                    <TableRow key={i} id={i}>
                        <TableCell>{tableData[i].submeter_bill_id}</TableCell>
                        <TableCell>{tableData[i].bill_id}</TableCell>
                        <TableCell>{tableData[i].submeter_id}</TableCell>
                        <TableCell>{tableData[i].prior_read}</TableCell>
                        <TableCell>{tableData[i].cur_read}</TableCell>
                        <TableCell>{tableData[i].amt_due}</TableCell>
                    </TableRow>
                );
            }
            this.res = res;
            this.forceUpdate();
        });
    }

    render() {
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Billing History</Typography>
                <form noValidate>
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
                </form>
                <DialogContentText />
                <Button onClick={this.onSubmit} color="primary">
                    Show
                </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Meter Bill ID</TableCell>
                            <TableCell>Meter</TableCell>
                            <TableCell>From</TableCell>
                            <TableCell>To</TableCell>
                            <TableCell>Total KWH Usage</TableCell>
                            <TableCell>Unit Charge</TableCell>
                            <TableCell>Total Charge</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.resm}
                    </TableBody>
                </Table>
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Submeter Bill ID</TableCell>
                            <TableCell>Associate with Bill ID:</TableCell>
                            <TableCell>Submeter</TableCell>
                            <TableCell>Prior Read</TableCell>
                            <TableCell>Current Read</TableCell>
                            <TableCell>Amount Due</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.res}
                    </TableBody>
                </Table>
            </React.Fragment>
        )
    }
}

export default BillingHistory;