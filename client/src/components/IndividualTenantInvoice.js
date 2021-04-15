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
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Page from './Page';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
class IndividualTenantInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // display: this.props.display,
      invoice_list: this.props.invoice_list,
      tenant_list: this.props.tenant_list,
      property_info: this.props.property_info,
      open: false,

      
    };
    this.sub_meter_size = 0;
    this.meter_size = 0;
    this.generateTableData = this.generateTableData.bind(this);

    this.generateIndividual = this.generateIndividual.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.printDocument= this.printDocument.bind(this);
    console.log("invoice list::::::", this.state.invoice_list);
    
  }
  componentDidMount() {
    this.generateTableData();
    this.generateIndividual();
}
  handleClickOpen() {
    this.setState({
      open: true,
    });
  }
  generateTableData = () => {
    var sub_total_charge = 0;
    var submeter_number = 0; //  is submeter number count for print pdf function
    var meter_number = 0; // it is meter number count for print pdf function
    var meter_total_charge = 0;
    var total_tenant_share = 0;
//////////////////////////////////////////////////
    var matrix = [];
    var tenant_list_size = this.state.tenant_list.length;


    for ( var i = 0; i < tenant_list_size; i++ ) {
        matrix[i] = []; 
    }
    this.res = matrix;
    this.print = matrix;
    
/////////////////////////////////////////////////
//create empty array but with defined size
/////////////////////////////////////////////////
      for (var i = 0; i < tenant_list_size; i++) {
        
        if(this.state.tenant_list[i].rubs == 0){

        this.res[i].push(
        
        <div>        
        <Table>
            <table>

            <tr class="spaceUnder">
            <tr>{this.state.tenant_list[i].name}</tr>
            <td></td>
            </tr>

            <tr class="spaceUnder">
            <tr>{this.state.tenant_list[i].address}</tr>
            <td></td>
            </tr>

            <tr class="spaceUnder">
            <tr>{this.state.invoice_list[0].from_date.split("T")[0]}</tr>
            <tr>{this.state.invoice_list[0].to_date.split("T")[0]}</tr>
            </tr>

            </table>
        </Table>

        <Table>

          <TableRow>
            <TableCell>Sub-Unit</TableCell>
            <TableCell>Prior Amt (KwH)</TableCell>
            <TableCell>Current Amt (KwH)</TableCell>
            <TableCell>Current Usage (KwH)</TableCell>
            <TableCell>Unit Charge</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>

        </Table>
        </div>
        );}
        
        else{

          this.res[i].push(
          <div>        
            <Table>
                <table>
    
                <tr class="spaceUnder">
                <tr>{this.state.tenant_list[i].name}</tr>
                <td></td>
                </tr>
    
                <tr class="spaceUnder">
                <tr>{this.state.tenant_list[i].address}</tr>
                <td></td>
                </tr>
    
                <tr class="spaceUnder">
                <tr>{this.state.invoice_list[0].from_date.split("T")[0]}</tr>
                <tr>{this.state.invoice_list[0].to_date.split("T")[0]}</tr>
                </tr>
    
                </table>
            </Table>
    
            <Table>
    
              <TableRow>
                <TableCell>Meter Number</TableCell>
                <TableCell>RUBS</TableCell>
                <TableCell>Meter Charge</TableCell>
                <TableCell>Amount Due</TableCell>
              </TableRow>
    
            </Table>
            </div>

          );
        }
        
        for ( var j =0;  j<this.state.invoice_list.length; j++){
          
          var current_invoice = this.state.invoice_list[j];
          if(current_invoice.has_submeter == 'y' && current_invoice.tenant_id == this.state.tenant_list[i].tenant_id){
            sub_total_charge = current_invoice.total_charge;
            submeter_number++;
            this.res[i].push(
            <Page>
            <Table>
            <TableRow >
            <TableCell>{current_invoice.submeter_id}</TableCell>
            <TableCell>{current_invoice.prior_read}</TableCell>
            <TableCell>{current_invoice.cur_read}</TableCell>
            <TableCell>{current_invoice.cur_read - current_invoice.prior_read}</TableCell>
            <TableCell>{current_invoice.unit_charge}</TableCell>
            <TableCell>{current_invoice.submeter_charge}</TableCell>
            </TableRow>
            </Table>
            </Page>            
          );
          }else if(current_invoice.has_submeter == 'n' && current_invoice.tenant_id == this.state.tenant_list[i].tenant_id){
            meter_number++;
            meter_total_charge = meter_total_charge + current_invoice.total_charge;
            total_tenant_share = total_tenant_share + current_invoice.meter_amt_due;
            this.res[i].push(
            <Page>
            <Table>
            <TableRow >
            <TableCell>{current_invoice.meter_id}</TableCell>
            <TableCell>{current_invoice.rubs}</TableCell>
            <TableCell>{current_invoice.total_charge}</TableCell>
            <TableCell>{current_invoice.meter_amt_due}</TableCell>
            </TableRow>
            </Table>
            </Page>            
          );

          }

        }; 
        if(current_invoice.has_submeter == 'y'){
          this.res[i].push(
            <Table>
            <TableRow>
            <TableCell><tr class="spaceUnder">Total Amount</tr></TableCell>
            <TableCell><tr class="spaceUnder">{'$'+sub_total_charge}</tr></TableCell>
            </TableRow>
    
            <TableRow>
            <TableCell>Enclosed</TableCell>
            <TableCell></TableCell>
            </TableRow>
            </Table>
    
            );

        }else if(current_invoice.has_submeter == 'n'){
          this.res[i].push(
            <Table>
            <TableRow>
            <TableCell><tr class="spaceUnder">Total Building Monthly Electrical Bill</tr></TableCell>
            <TableCell><tr class="spaceUnder">{'$'+meter_total_charge}</tr></TableCell>
            </TableRow>

            <TableRow>
            <TableCell><tr class="spaceUnder">Tenant Square Footage Share</tr></TableCell>
            <TableCell><tr class="spaceUnder">{current_invoice.rubs * 100 + '%'}</tr></TableCell>
            </TableRow>

            <TableRow>
            <TableCell><tr class="spaceUnder">Tenant Share of Electric Bill</tr></TableCell>
            <TableCell><tr class="spaceUnder">{'$'+ total_tenant_share}</tr></TableCell>
            </TableRow>
    
            <TableRow>
            <TableCell>Enclosed</TableCell>
            <TableCell></TableCell>
            </TableRow>
            </Table>
    
            );
            
        }     

      }
      this.setState({sub_meter_size : submeter_number});
      this.setState({meter_size : meter_number});
      this.forceUpdate();

  };

  generateIndividual = () =>{
    var matrix = [];
    var tenant_list_size = this.state.tenant_list.length;

    for ( var i = 0; i < tenant_list_size; i++ ) {
        matrix[i] = []; 
    }
    this.print = matrix;


    for(var c=0; c< tenant_list_size; c++){
      this.print[c].push(
        <div id={c}>{this.res[c]}</div>
      )
    }

  }

  printDocument() {

    for(var a = 0; a<this.state.tenant_list.length; a++){
    const input = document.getElementById(a);
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF("p", "mm", "a4");
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();   
        
          if(this.sub_meter_size >12){
            pdf.addImage(imgData, 'JPEG', 0, 0, width*0.9, height);
          }

          if(this.sub_meter_size <=12 & this.sub_meter_size >9){
            pdf.addImage(imgData, 'JPEG', 0, 0, width, height*0.8);
          }

          if(this.sub_meter_size <=9 & this.sub_meter_size >6){
            pdf.addImage(imgData, 'JPEG', 0, 0, width, height*0.55);
          }

          if(this.sub_meter_size <=6 & this.sub_meter_size >=0){
            pdf.addImage(imgData, 'JPEG', 0, 0, width, height*0.4);
          }

        pdf.save("download.pdf");
      });
    }

  }

  render() {

    return (
      
      <div className="main">
         <a href="#" onClick={this.handleClickOpen}>
         gggg
        </a>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              </TableRow>
            </TableHead>
            <button onClick={this.printDocument}>Generate PDF</button>
            <button>Send Invoces to Tenants</button>
              
            <TableBody><div>{this.print}</div></TableBody>      

          </Table>
        </TableContainer>
      </div>
      
    );
  }
}

export default IndividualTenantInvoice;