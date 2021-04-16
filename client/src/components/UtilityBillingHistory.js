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
import UtilityBillMeter from "./UtilityBillMeter"
import UtilityBillSubmeter from "./UtilityBillSubmeter"
import BillingHistory from "./BillingHistory"
import CollapseSubmeter from "./CollapseSubmeter"
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
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { DialogContent } from "@material-ui/core";

class UtilityBillingHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: this.props.display,
            property_id: this.props.property_id,
            tenant_list: this.props.tenant_list
        }
    }

    render() {
        const useStyles = makeStyles((theme) => ({
            container: {
                paddingTop: theme.spacing(4),
                paddingBottom: theme.spacing(4),
            },
            paper: {
                padding: theme.spacing(2),
                display: 'flex',
                overflow: 'auto',
                flexDirection: 'column',
            },
            fixedHeight: {
                height: 240,
            }
        }));
        return (
            <div className="main">
            <React.Fragment>
                <Container maxWidth="lg" className={useStyles.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper>
                                <BillingHistory
                                    className="display_item"
                                    property_id={this.state.property_id}
                                    tenant_list={this.state.tenant_list}
                                    info={this}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper>
                                <UtilityBillMeter className="display_item" property_id={this.state.property_id} info={this} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper>
                                <UtilityBillSubmeter
                                    className="display_item"
                                    property_id={this.state.property_id}
                                    info={this}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
            </div>
        )
    }
}

export default UtilityBillingHistory;