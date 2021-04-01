import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import Navigation from "./Navigation.js";
import HomePage from "./HomePage.js";
import PropManaAfterSign from "./PropManaAfterSign.js";
import AddProperty from "./AddProperty";
import EditProperty from "./EditProperty";
import DeleteProperty from "./DeleteProperty";
import TenantInfo from "./TenantInfo";
import { Component } from "react";
import Button from "@material-ui/core/Button";
import { TableBody } from "@material-ui/core";
import axios from "axios";

class MeterInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
          display: this.props.display,
          sub: this.props.sub,
          meter_list: [],
        };
        this.generateTableData();
      }

      getTenantList() {
        return new Promise((resolve, reject) => {
          axios.get(`/meter/${this.state.property_id}`).then((response) => {
            this.setState({ meter_list: response.data });
            resolve();
          });
        });
      }


}