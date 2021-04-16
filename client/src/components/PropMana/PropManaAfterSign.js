import React from "react";
import { Component } from "react";
import { matchPath } from "react-router-dom";
import "./../../App.css";
import TenantInfo from "./Tenant/TenantInfo";
import PropertyInfo from "./Property/PropertyInfo";
import InvoiceHistory from "./../InvoiceHistory";
import UtilityBillingHistory from "./../UtilityBillingHistory";
import SideMenu from "./SideMenu";
import Typography from "@material-ui/core/Typography";
import { DialogContent } from "@material-ui/core";

class PropManaAfterSign extends Component {
  constructor(props) {
    super(props);
    var page;
    var sub = this.props.match.params.sub;
    var property_id;
    var user_type;
    if (
      matchPath(this.props.location.pathname, { path: "/PropMana/:sub/user_info", exact: true, strict: false }) ||
      matchPath(this.props.location.pathname, { path: "/Admin/PropMana/:sub/user_info", exact: true, strict: false })
    ) {
      page = "user_info";
    } else if (
      matchPath(this.props.location.pathname, { path: "/PropMana/:sub/property", exact: true, strict: false }) ||
      matchPath(this.props.location.pathname, { path: "/Admin/PropMana/:sub/property", exact: true, strict: false })
    ) {
      page = "property";
    } else if (
      matchPath(this.props.location.pathname, { path: "/PropMana/:sub/property/:property_id", exact: true, strict: false }) ||
      matchPath(this.props.location.pathname, { path: "/Admin/PropMana/:sub/property/:property_id", exact: true, strict: false })
    ) {
      property_id = this.props.match.params.property_id;
      page = "tenant";
    } else if (
      matchPath(this.props.location.pathname, { path: "/PropMana/:sub/property/:property_id/invoice_history", exact: true, strict: false }) ||
      matchPath(this.props.location.pathname, { path: "/Admin/PropMana/:sub/property/:property_id/invoice_history", exact: true, strict: false })
    ) {
      property_id = this.props.match.params.property_id;
      page = "invoice_history";
    } else if (
      matchPath(this.props.location.pathname, { path: "/PropMana/:sub/property/:property_id/utility_bill", exact: true, strict: false }) ||
      matchPath(this.props.location.pathname, { path: "/Admin/PropMana/:sub/property/:property_id/utility_bill", exact: true, strict: false })
    ) {
      property_id = this.props.match.params.property_id;
      page = "utility_bill";
    }

    if (matchPath(this.props.location.pathname, { path: "/Admin", exact: false })) {
      user_type = "Admin";
    } else {
      user_type = "PropMana";
    }
    this.state = {
      sub: sub,
      property_id: property_id,
      page: (() => {
        switch (page) {
          case "property":
            return <PropertyInfo sub={sub} is_admin={user_type == "Admin" ? true : false} />;
          case "tenant":
            return <TenantInfo sub={sub} property_id={property_id} />;
          case "invoice_history":
            return <InvoiceHistory display={this} property_id={property_id} tenant_list={this.tenant_list} />;
          case "utility_bill":
            return <UtilityBillingHistory display={this} property_id={property_id} tenant_list={this.tenant_list} />;
        }
      })(),
      page_name: (() => {
        switch (page) {
          case "property":
            return sessionStorage.getItem("username") + " Properties";
          case "tenant":
            return sessionStorage.getItem("property_name") + " Information";
        }
      })(),
      menu_display_more_options: (() => {
        switch (page) {
          case "property":
            return false;
          case "tenant":
            return true;
          case "invoice_history":
            return true;
          case "utility_bill":
            return true;
        }
      })(),
      is_admin: (() => {
        switch (user_type) {
          case "Admin":
            return true;
          case "PropMana":
            return false;
        }
      })(),
    };
    sessionStorage.setItem("sub", sub);
  }

  render() {
    return (
      <div className="topOffset leftOffset">
        <Typography component="h1" variant="h5" color="primary">
          {this.state.page_name}
        </Typography>
        <DialogContent />
        <div className="Info_Page_Split">
          <SideMenu sub={this.state.sub} display_more_options={this.state.menu_display_more_options} is_admin={this.state.is_admin} property_id={this.state.property_id} />
          <div className="display">{this.state.page}</div>
        </div>
      </div>
    );
  }
}

export default PropManaAfterSign;
