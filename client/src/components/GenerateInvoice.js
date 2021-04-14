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
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DatePicker from "./DatePicker.js";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ResourceGroups, Route53Resolver } from "aws-sdk";
class GenerateInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property_id: 10,
      begin: "",
      end: "",
      open: false,
      from_date: "",
      to_date: "",
      meter_bill_list:[],
      submeter_bill_list:[],
      final_invoice_list: [],
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeFromDate = this.changeFromDate.bind(this);
    this.changeTodate = this.changeTodate.bind(this);
  }

  handleClickOpen() {
    this.setState({
      open: true,
    });
  }

  changeFromDate(date) {
    this.setState({
      from_date: date,
    });
  }
  changeTodate(date) {
    this.setState({
      to_date: date,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }
  uploadInvoiceToDataBase(final_invoice_list){
    return new Promise((resolve, reject) => {
      axios.post("/upload_invoice", {final_invoice_list: final_invoice_list}).then((response) => {
        console.log("response",response.data);
        if(response.data.length > 0){
          alert("this month invoices were generated previously, please checkout invoice history");
          return;
        }
        // if(response.data = []){
        //   alert("this month invoices were generated previously, please checkout invoice history");
        //   return;
        // }
      });


    });
  }
  invoice_generator() {
    return new Promise((resolve, reject) => {
    axios.post("/meterbill_list", { property_id: this.state.property_id, from_date: this.state.from_date, to_date: this.state.to_date }).then((response) => {
      console.log("response body:", response.data);
      console.log("rr:" ,response.data.meter_bill_list);
      resolve();
      // meter_submeter_list: JSON.parse(JSON.stringify(result)),
      // meter_bill_list: JSON.parse(JSON.stringify(result2)),
      // submeter_bill_list: JSON.parse(JSON.stringify(result3)),
      // meter_tenant_list: JSON.parse(JSON.stringify(result4)),
      this.setState({
        meter_bill_list : response.data.meter_bill_list,

        submeter_bill_list : response.data.submeter_bill_list,

      });
      //step1, preprocess meter bill and submeter bill;
      var meter_bill_list = response.data.meter_bill_list;
      var submeter_bill_list = response.data.submeter_bill_list;
      var meter_tenant_list = response.data.meter_tenant_list;
      var all_tenant_list = response.data.all_tenant_list;
      var submeter_tenant_list = response.data.meter_submeter_list;
      var aft_meter_bill_list = meter_bill_list;
      for(var i = 0; i < aft_meter_bill_list.length; i++){
        
        //for each meter bill, subtract submeter bill from it 
        var bill_id = aft_meter_bill_list[i].bill_id;

        for(var j = 0; j < submeter_bill_list.length; j++){
          var tmp_assoc_bill_id = submeter_bill_list[j].bill_id;
          if(Number(bill_id) == Number(tmp_assoc_bill_id)) {
            aft_meter_bill_list[i].total_charge = Number(aft_meter_bill_list[i].total_charge)-Number(submeter_bill_list[j].amt_due);
          }
          
  
        }
  
  
      }
      //after prerprocess, we need to calcualte tenant invoice
      var new_bill_list = [];
      for(var i = 0; i < all_tenant_list.length; i++){
        console.log("loop all tenants:", all_tenant_list[i]);
        var current_tenant = all_tenant_list[i];
        //handle meter tenant here:
        if(Number(current_tenant.rubs) > 0){
          console.log(current_tenant.tenant_id, "is rubs");
          var tt = get_all_meterbills_for_tenant(current_tenant.tenant_id, meter_tenant_list, meter_bill_list);
          var sum = 0;
          var charge_list = [];
          for(var j = 1; j < tt.length; j++){
            sum += Number(current_tenant.rubs)*tt[j].total_charge;
            charge_list.push({
                "meter_id" : tt[j].meter_id,
                "meter_amt_due": tt[j].total_charge*current_tenant.rubs,

            });
          }
          console.log("the rubs tenant bill list is here: ", tt);
          var email = get_tenant_emailby_tenant_id(current_tenant.tenant_id, all_tenant_list);
          var rubs_invoice = {
            charge_list: charge_list,
            rubs: current_tenant.rubs,
            tenant_id: current_tenant.tenant_id,
            from_date: meter_bill_list[0].from_date,
            to_date: meter_bill_list[0].to_date,
            has_submeter: 0,
            total_charge: sum,
          }

          new_bill_list.push(rubs_invoice);
        }


        else if(Number(current_tenant.rubs) == 0){ //handle submeter case here
          console.log("starting handle submeter tenant:");
          var tt = get_all_submeter_bill_by_tenant_id(current_tenant.tenant_id, submeter_tenant_list, submeter_bill_list);
          console.log("submeter tenant:", tt);
          var sum = 0;
          var charge_list = [];
          for(var j = 1; j < tt.length; j++){
            console.log("ttttttt:", tt[j].amt_due);
            sum += Number(tt[j].amt_due);
            var multiplier = get_multiperby_submeter_id(tt[j].submeter_id, submeter_tenant_list);
            charge_list.push({
              "submeter_id": tt[j].submeter_id,
              "unit_charge": tt[j].unit_charge,
              "prior_read": tt[j].prior_read,
              "cur_read": tt[j].cur_read,
              "multiplier": multiplier,
              "amt_due": tt[j].amt_due

            });
          }
          console.log("sum: ", sum);
          var email = get_tenant_emailby_tenant_id(current_tenant.tenant_id, all_tenant_list);
          var sub_invoice = {
            charge_list: charge_list,
            tenant_id: current_tenant.tenant_id,
            from_date: meter_bill_list[0].from_date,
            to_date: meter_bill_list[0].to_date,
            has_submeter: 1,
            total_charge: sum,
            rubs: current_tenant.rubs
          }

          new_bill_list.push(sub_invoice);
        }

      }
      console.log("final invoice list:", new_bill_list);
      this.uploadInvoiceToDataBase(new_bill_list);
    });
  });
  }


  onSubmit(event) {
    //* not sure about what kind of information should be transmitted.
    event.preventDefault();
    this.setState({
      open: false,
    });
    if(this.state.from_date == '' || this.state.to_date == ''){
      alert("please select a time period");
    }else{
    this.invoice_generator();

    }
  }

  render() {
    return (
      <div>
        <a href="#" onClick={this.handleClickOpen}>
          Generate Invoice
        </a>
        <div className="main">
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">

            (please generate invoice after inputting all bills and submeter bills,
            please only generate invoice once per month,
            current function only support 1 month invoice generate)
            </DialogTitle>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Property ID: {this.state.property_id}</TableCell>
                  <TableCell>
                    <DatePicker from_date={this.changeFromDate.bind(this)} to_date={this.changeTodate.bind(this)} />
                  </TableCell>

                  <TableCell>
                    <Button onClick={this.onSubmit} color="primary">
                      Generate
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{this.res}</TableBody>
            </Table>
          </Dialog>{" "}
        </div>
      </div>
    );
  }
}

function get_all_meterbills_for_tenant(tenant_id, meter_tenant_list,  meter_bill_list){

  var list = [tenant_id];
  for(var i = 0; i < meter_tenant_list.length; i++){
    if(Number(tenant_id) == Number(meter_tenant_list[i].tenant_id)){
        list.push(get_meter_bill_by_meter_id(meter_tenant_list[i].meter_id, meter_bill_list));

    }
  }

  return list;
}
function get_meter_bill_by_meter_id(meter_id, meter_bill_list){
  for(var i = 0; i < meter_bill_list.length; i++){
    if(Number(meter_bill_list[i].meter_id) == Number(meter_id)){
      return meter_bill_list[i];
    }

  }
  return null;
}

function get_all_submeter_bill_by_tenant_id(tenant_id, meter_submeter_list, submeter_bill_list){
  var list = [tenant_id];
  console.log('find tenant', tenant_id, meter_submeter_list);
  for(var i = 0; i < meter_submeter_list.length; i++){
    if(Number(tenant_id) == Number(meter_submeter_list[i].tenant_id)){
      list.push(get_submeter_bill_by_submeter_id(meter_submeter_list[i].submeter_id, submeter_bill_list));
    }

  }
  return list;
}

function get_submeter_bill_by_submeter_id(submeter_id, submeter_bill_list){
  for(var i = 0; i < submeter_bill_list.length; i++){
    if(submeter_id == submeter_bill_list[i].submeter_id){
      console.log("submeter_bill_list:",submeter_bill_list[i] );
      return submeter_bill_list[i];
    }
  }
  return null;
}

function get_multiperby_submeter_id(submeter_id, meter_tenant_list){
  for(var i = 0; i < meter_tenant_list.length; i++){
      if(submeter_id == meter_tenant_list[i].submeter_id){
        return meter_tenant_list[i].multiplier;
      }

  }
  return 0;
}
function get_tenant_emailby_tenant_id(tenant_id, all_tenant_list){
  for(var i = 0; i < all_tenant_list.length; i++){
    if(Number(tenant_id) == Number(all_tenant_list[i].tenant_id)){
      return all_tenant_list[i].email;
    }
  }
  return null;
}
export default GenerateInvoice;

