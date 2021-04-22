import React, { useState } from "react";
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
import { Component } from "react";
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { DialogContent, DialogContentText, Tab } from "@material-ui/core";

class CollapseMeterInvoice extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            from_date: this.props.from_date,
            to_date: this.props.to_date,
            property_id: this.props.property_id,
            tenant_list: this.props.tenant_list,
            property_info: this.props.property_info,
            invoice_id: this.props.invoice_id
        }
        this.getMeterInvoiceList = this.getMeterInvoiceList.bind(this);
        this.generateTable();
    }

    getMeterInvoiceList() {
        return new Promise((resolve, reject) => {
            axios.post("/invoice_history", { property_id: this.state.property_id, from_date: this.state.from_date, to_date: this.state.to_date }).then((response) => {
                console.log("invoice history response:", response.data);
                this.setState({
                    invoice_list: response.data.invoice_list,
                    tenant_list: response.data.tenant_list,
                    property_info: response.data.property_info
                })
                resolve();
                if (response.data.invoice_list == false || response.data.invoice_list.length === 0) {
                    alert("no invoice in selecting time peirod, make sure  generate invoice first using {Generate Invoice} on the side bar");
                    return;
                }
            });
        });
    }

    generateTable() {
        //call updateTable everytime when we need to generate a list of submeter and multiplier
        // see hardcode below in render() function
        var res = [];
        this.getMeterInvoiceList().then(() => {
            var tableData = this.state.invoice_list;
            var tableDataTenant = this.state.tenant_list;
            var tableDataProperty = this.state.property_info;
            console.log(this.state.invoice_list)
            console.log(tableDataTenant)
            console.log(tableDataProperty)
            console.log(this.state.submeter_list)
            for (var i = 0; i < tableData.length; i++) {
                res.push(
                    <TableRow key={i} id={i}>
                        <TableCell></TableCell>
                    </TableRow>
                );
            }
            this.res = res;
            this.forceUpdate();
        });
    }

    render() {
        return (
            <div>
                <CollapseRow res={this.res} />
            </div>
        );
    }
}

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function CollapseRow(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const res = props.res;
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="big" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="submeter">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Submeter</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {res}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default CollapseMeterInvoice;
