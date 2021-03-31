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
import { Component } from "react";
import { TableBody } from "@material-ui/core";
import axios from "axios";

class TenantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.display,
      sub: this.props.sub,
      property_id: this.props.property_id,
      tenant_list: [],
    };
    this.generateTableData();
  }

  componentDidUpdate() {
    if (this.props.sub !== this.state.sub || this.props.property_id !== this.state.property_id) {
      this.setState({
        display: this.props.display,
        sub: this.props.sub,
        property_id: this.props.property_id,
        tenant_list: [],
      });
      this.generateTableData();
    }
  }

  getTenantList() {
    return new Promise((resolve, reject) => {
      axios.get(`/tenant/${this.state.property_id}`).then((response) => {
        this.setState({ tenant_list: response.data });
        resolve();
      });
    });
  }

  // updateTenantTable(sub,  propery_id, tenant_list){
  //             var tenant_list;
  //             for(var i = 0; i < tenant_list.length; i++){
  //                 this.state.tenant_list.push({
  //                     tenant_id: tenant_list[i].tenant_id,
  //                     name: tenant_list[i].name,
  //                     email: tenant_list[i].email,
  //                     address: tenant_list[i].address,
  //                     property_share: tenant_list[i].property_share,
  //                     submeter: tenant_list[i].submeter

  //                 })
  //             }

  //         }

  //get tenant_list from database  implement get_tenant_list function here

  generateTableData() {
    //call updateTable everytime when we need to generate a list of tenants
    //this.updateTenantTable(this.state.sub, this.state.property_id);
    this.getTenantList().then(() => {
      var res = [];
      let tableData = this.state.tenant_list;
      for (var i = 0; i < tableData.length; i++) {
        res.push(
          <tr key={i} id={i}>
            <td>{tableData[i].name}</td>
            <td>{tableData[i].email}</td>
            <td>{tableData[i].address}</td>
            <td>{tableData[i].rented_area}</td>
            <td>{tableData[i].submeter}</td>
            <td>
              <EditTenant
                tenant_id={tableData[i].tenant_id}
                name={tableData[i].name}
                email={tableData[i].email}
                address={tableData[i].address}
                rented_area={tableData[i].rented_area}
                submeter={tableData[i].submeter}
                property_id={this.state.property_id}
                info={this}
              />
            </td>
            <td>
              <DeleteTenant
                tenant_id={tableData[i].tenant_id}
                name={tableData[i].name}
                email={tableData[i].email}
                address={tableData[i].address}
                rented_area={tableData[i].rented_area}
                submeter={tableData[i].submeter}
                property_id={this.state.property_id}
                info={this}
              />
            </td>
          </tr>
        );
      }
      this.res = res;
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div>
        <table className="table">
          <tbody>
            <tr>
              <th style={{ width: "25%" }}>Name</th>
              <th style={{ width: "25%" }}>Email</th>
              <th style={{ width: "25%" }}>Address</th>
              <th style={{ width: "10%" }}>Property Share</th>
            </tr>
            {this.res}
          </tbody>
        </table>
        <AddTenant className="display_item" property_id={this.state.property_id} info={this} />
      </div>
    );
  }
}

function manage_tenant() {
  const ele = (
    <div>
      <TenantInfo />
    </div>
  );
  window.location = "/PropManaAfterSign/TenantInfo";
  return ReactDOM.render(ele, document.getElementById("root"));
}

function manage_property() {
  const ele = (
    <div>
      <PropertyInfo />
    </div>
  );
  window.location = "/PropManaAfterSign/PropertyInfo";
  return ReactDOM.render(ele, document.getElementById("root"));
}

function edit_profile() {
  const ele = <div></div>;
  return ReactDOM.render(ele, document.getElementById("root"));
}

function manage_utility() {
  const ele = <div></div>;
  return ReactDOM.render(ele, document.getElementById("root"));
}

function manage_invoice() {
  const ele = <div></div>;
  return ReactDOM.render(ele, document.getElementById("root"));
}

function generate_invoice() {
  const ele = <div></div>;
  return ReactDOM.render(ele, document.getElementById("root"));
}

function log_out() {
  const ele = (
    <div>
      <div className="PropMana_menu" id="logout">
        <header className="RegProcess-header">
          <h1>You have successfully logout</h1>
          <button className="button" onClick={homepage}>
            OK
          </button>
        </header>
      </div>
    </div>
  );
  return ReactDOM.render(ele, document.getElementById("root"));
}

function homepage() {
  window.location = "/";
  return ReactDOM.render(<HomePage />, document.getElementById("root"));
}

function back() {
  return ReactDOM.render(<PropManaAfterSign />, document.getElementById("root"));
}
function confirm_win() {
  window.confirm("Sure?");
}
function addNewTenant(sub, property_id, new_tenant) {
  //call add_new_tenant function here to add to database
}

export default TenantInfo;
