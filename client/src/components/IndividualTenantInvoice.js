import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
//////////////////////////////////////////////


import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import * as htmlToImage from 'html-to-image';
import {toPng, toJpeg, toBlob, toPixelData, toSvg} from 'html-to-image';
// var htmlToImage =require('html-to-image');
///////////////////////////////////////////////
class IndividualTenantInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      display: this.props.display,
      invoice_list: this.props.invoice_list,
      tenant_list: this.props.tenant_list,
      property_info : this.props.property_info

    };
    /////////////////////////////////
    this.sub_meter_size = 0;
    this.meter_size = 0;
    // this.generateTableData();
    // this.generateIndividual();
    this.generateTableData = this.generateTableData.bind(this);
    this.generateIndividual = this.generateIndividual.bind(this);
    this.printDocument= this.printDocument.bind(this);
    //////////////////////////////////////////


    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  handleClickOpen() {
    this.setState({
      open: true,
    });
    console.log(
      "invoice list: ", this.props.invoice_list[0]
    )
    this.generateTableData();
    this.generateIndividual();
  }
  handleClose() {
<<<<<<< HEAD
=======
    this.setState({
      open: false,
    });
  }


  generateTableData = () => {
    var sub_total_charge = 0;
    var submeter_number = 0; //  is submeter number count for print pdf function
    var meter_number = 0; // it is meter number count for print pdf function
    var meter_total_charge = 0;
    var total_tenant_share = 0;
//////////////////////////////////////////////////
    var matrix = [],
    tenant_list_size = this.state.tenant_list.length;


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
          // submeter first part table
        this.res[i].push(
        
        <div>        

            <table>

            <tr class="spaceUnder">
            <tr>{this.state.tenant_list[i].name}</tr>
            <td></td>
            </tr>

            <tr class="spaceUnder">
            <tr>{this.state.tenant_list[i].address}</tr>
            <td></td>
            </tr>

            <tr>Electrical Charges as Metered</tr>
            <td></td>

            <tr class="spaceUnder">
            <tr>Period Start:  {this.state.invoice_list[0].from_date.split("T")[0]}</tr>
            <tr>Period End: {this.state.invoice_list[0].to_date.split("T")[0]}</tr>
            </tr>

            </table>

        <table class="underline">
          <tr>
            <th>Sub-Unit</th>
            <th>PriorAmt(KwH)</th>
            <th>CurrentAmt(KwH)</th>
            <th>CurrentUsage(KwH)</th>
            <th>UnitCharge</th>
            <th>Amount</th>
          </tr>
        </table>
        </div>

        );}
        
        else{
          //meter first part table
          this.res[i].push(
          <div>        

            <table>    
                <tr class="spaceUnder">
                <tr>{this.state.tenant_list[i].name}</tr>
                <td></td>
                </tr>
    
                <tr class="spaceUnder">
                <tr>{this.state.tenant_list[i].address}</tr>
                <td></td>
                </tr>

                <tr>Electrical Charges as Metered</tr>
                <td></td>
    
                <tr class="spaceUnder">
                <tr>{this.state.invoice_list[0].from_date.split("T")[0]} to {this.state.invoice_list[0].to_date.split("T")[0]}</tr>
                <td></td>
                </tr>    
            </table>

            </div>

          );
        }
        
        for ( var j =0;  j<this.state.invoice_list.length; j++){
          
          var current_invoice = this.state.invoice_list[j];
          if(current_invoice.has_submeter == 'y' && current_invoice.tenant_id == this.state.tenant_list[i].tenant_id){
            // submeter second part of table
            sub_total_charge = current_invoice.total_charge;
            submeter_number++;
            this.res[i].push(

            <table>
            <tr>
            <th class = "unbolden">{current_invoice.submeter_id}--</th>
            <th class = "unbolden">{current_invoice.prior_read}--</th>
            <th class = "unbolden">{current_invoice.cur_read}------</th>
            <th class = "unbolden">{current_invoice.cur_read - current_invoice.prior_read}----</th>
            <th class = "unbolden">{current_invoice.unit_charge}----</th>
            <th class = "unbolden">$ {current_invoice.submeter_charge}</th>
            </tr>
            </table>
          
          );
          }else if(current_invoice.has_submeter == 'n' && current_invoice.tenant_id == this.state.tenant_list[i].tenant_id){
            meter_number++;
            meter_total_charge = meter_total_charge + current_invoice.total_charge;
            total_tenant_share = total_tenant_share + current_invoice.meter_amt_due;
            
          //   this.res[i].push(
          //   <Page>
          //   <Table>
          //   <TableRow >
          //   <TableCell>{current_invoice.meter_id}</TableCell>
          //   <TableCell>{current_invoice.rubs}</TableCell>
          //   <TableCell>{current_invoice.total_charge}</TableCell>
          //   <TableCell>{current_invoice.meter_amt_due}</TableCell>
          //   </TableRow>
          //   </Table>
          //   </Page>            
          // );

          }

        }; 
        if(this.state.tenant_list[i].rubs == 0){
          // submeter table at end of submeters charge list
          this.res[i].push(
            <table>
            <tr>
            <th class="topline">Total Amount:................................................................................................................. </th>
            <th class="topline"></th>
            <th class="topline">$ {sub_total_charge}</th>
            <th class="topline" ></th>
            </tr>
            </table>
          );

          this.res[i].push(
            <table>
            <tr>
            <th class="top_and_bottom_line">Enclosed_______________________________________________________________________________________________</th>
            <td></td>
            </tr>
            </table>
  
          );

        }else if(this.state.tenant_list[i].rubs != 0){
          // meter table at end of meter charge
          this.res[i].push(
            <table class="place_in_center">

                <tr class="spaceUnder">
                <tr>Total Building Monthly Electrical Bill</tr>
                <tr>$ {meter_total_charge}</tr>
                <td></td>
                </tr>

                <tr class="spaceUnder">
                <tr>Tenant Square Footage Share</tr>
                <tr>{this.state.tenant_list[i].rubs * 100} %</tr>
                <td></td>
                </tr>

                <tr class="spaceUnder">
                <tr>Tenant Share of Electric Bill</tr>
                <tr>$ {total_tenant_share}</tr>
                <td></td>
                </tr>

                <tr class="spaceUnder">
                <tr>Please make check payable to Property Tech LLc</tr>
                <td></td>
                </tr>
            </table>
    
            );

          this.res[i].push(
            <table>

                <tr class="spaceUnder">
                <tr>Due upon recipt</tr>
                <td></td>
                </tr>

                <tr class="spaceUnder">
                <tr>Thank You,</tr>
                <td></td>
                </tr>

                <tr class="spaceUnder">
                <tr>Property Tech LLC</tr>
                <td></td>
                </tr>

                <tr>
                <th class="top_and_bottom_line">Enclosed_______________________________________________________________________________________________</th>
                <td></td>
                </tr>
                </table>  
          );
          
          
            
        }     

      }
      this.setState({sub_meter_size : submeter_number});
      this.setState({meter_size : meter_number});

  };

  generateIndividual = () =>{
    var matrix = [];
    var tenant_list_size = this.state.tenant_list.length;

    for ( var i = 0; i < tenant_list_size; i++ ) {
        matrix[i] = []; 
    }
    this.print = matrix;


    for(var c=0; c< tenant_list_size; c++){
      var i_d = this.res[c][0];

      this.print[c].push(
        <div id={'pdf'+c+this.state.tenant_list[c].tenant_id}>{this.res[c]}</div>
      )
    }

  }
  

  printDocument() {
    for(var i = 0; i < this.state.tenant_list.length; i++){
      htmlToImage.toPng(document.getElementById('pdf'+i+this.state.tenant_list[i].tenant_id), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        const pdf = new jsPDF();          
        pdf.addImage(dataUrl, 'PNG', 0, 0);
        pdf.save("download.pdf");  //'pdf+'tenant_id+from_date+to_date
      });

    // for(var a = 0; a<this.state.tenant_list.length; a++){
    // const input = document.getElementById(a+this.state.tenant_list[a].tenant_id);
    // html2canvas(input)
    //   .then((canvas) => {
    //     const imgData = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF("p", "mm", "a4");
    //     var width = pdf.internal.pageSize.getWidth();
    //     var height = pdf.internal.pageSize.getHeight();
        

        
    //     if(this.sub_meter_size >=10){
    //       pdf.addImage(imgData, 'JPEG', 0, 0, width, height*0.75);
    //     }
    //     else if (this.sub_meter_size <10 && this.sub_meter_size >=5){
    //       pdf.addImage(imgData, 'JPEG', 0, 0, width, height*0.5);
    //     }
    //     else if (this.sub_meter_size < 5 && this.sub_meter_size >=0){
    //       pdf.addImage(imgData, 'JPEG', 0, 0, width, height*0.3);
    //     }

    //     // pdf.addImage(imgData, 'JPEG', 0, 0, width, height*0.85);
    //     pdf.save("download.pdf");

          
    //   });
    // }
  }

  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>
          View PDF in dialog window
        </Button>
        <Dialog fullScreen open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogContent>
            <DialogContentText></DialogContentText>
            <div>{this.print}</div>
            <button onClick={this.printDocument}>PDF</button>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default IndividualTenantInvoice;
  handleClickOpen() {
>>>>>>> 6668d755688ae34d7e7a4aa74206d19449769a7d
    this.setState({
      open: false,
    });
  }


  generateTableData = () => {
    var sub_total_charge = 0;
    var submeter_number = 0; //  is submeter number count for print pdf function
    var meter_number = 0; // it is meter number count for print pdf function
    var meter_total_charge = 0;
    var total_tenant_share = 0;
//////////////////////////////////////////////////
    var matrix = [],
    tenant_list_size = this.state.tenant_list.length;


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
          // submeter first part table
        this.res[i].push(
        
        <div>        

            <table>

            <tr class="spaceUnder">
            <tr>{this.state.tenant_list[i].name}</tr>
            <td></td>
            </tr>

            <tr class="spaceUnder">
            <tr>{this.state.tenant_list[i].address}</tr>
            <td></td>
            </tr>

            <tr>Electrical Charges as Metered</tr>
            <td></td>

            <tr class="spaceUnder">
            <tr>Period Start:  {this.state.invoice_list[0].from_date.split("T")[0]}</tr>
            <tr>Period End: {this.state.invoice_list[0].to_date.split("T")[0]}</tr>
            </tr>

            </table>

        <table class="underline">
          <tr>
            <th>Sub-Unit</th>
            <th>PriorAmt(KwH)</th>
            <th>CurrentAmt(KwH)</th>
            <th>CurrentUsage(KwH)</th>
            <th>UnitCharge</th>
            <th>Amount</th>
          </tr>
        </table>
        </div>

        );}
        
        else{
          //meter first part table
          this.res[i].push(
          <div>        

            <table>    
                <tr class="spaceUnder">
                <tr>{this.state.tenant_list[i].name}</tr>
                <td></td>
                </tr>
    
                <tr class="spaceUnder">
                <tr>{this.state.tenant_list[i].address}</tr>
                <td></td>
                </tr>

                <tr>Electrical Charges as Metered</tr>
                <td></td>
    
                <tr class="spaceUnder">
                <tr>{this.state.invoice_list[0].from_date.split("T")[0]} to {this.state.invoice_list[0].to_date.split("T")[0]}</tr>
                <td></td>
                </tr>    
            </table>

            </div>

          );
        }
        
        for ( var j =0;  j<this.state.invoice_list.length; j++){
          
          var current_invoice = this.state.invoice_list[j];
          if(current_invoice.has_submeter == 'y' && current_invoice.tenant_id == this.state.tenant_list[i].tenant_id){
            // submeter second part of table
            sub_total_charge = current_invoice.total_charge;
            submeter_number++;
            this.res[i].push(

            <table>
            <tr>
            <th class = "unbolden">{current_invoice.submeter_id}--</th>
            <th class = "unbolden">{current_invoice.prior_read}--</th>
            <th class = "unbolden">{current_invoice.cur_read}------</th>
            <th class = "unbolden">{current_invoice.cur_read - current_invoice.prior_read}----</th>
            <th class = "unbolden">{current_invoice.unit_charge}----</th>
            <th class = "unbolden">$ {current_invoice.submeter_charge}</th>
            </tr>
            </table>
          
          );
          }else if(current_invoice.has_submeter == 'n' && current_invoice.tenant_id == this.state.tenant_list[i].tenant_id){
            meter_number++;
            meter_total_charge = meter_total_charge + current_invoice.total_charge;
            total_tenant_share = total_tenant_share + current_invoice.meter_amt_due;
            
          //   this.res[i].push(
          //   <Page>
          //   <Table>
          //   <TableRow >
          //   <TableCell>{current_invoice.meter_id}</TableCell>
          //   <TableCell>{current_invoice.rubs}</TableCell>
          //   <TableCell>{current_invoice.total_charge}</TableCell>
          //   <TableCell>{current_invoice.meter_amt_due}</TableCell>
          //   </TableRow>
          //   </Table>
          //   </Page>            
          // );

          }

        }; 
        if(this.state.tenant_list[i].rubs == 0){
          // submeter table at end of submeters charge list
          this.res[i].push(
            <table>
            <tr>
            <th class="topline">Total Amount:................................................................................................................. </th>
            <th class="topline"></th>
            <th class="topline">$ {sub_total_charge}</th>
            <th class="topline" ></th>
            </tr>
            </table>
          );

          this.res[i].push(
            <table>
            <tr>
            <th class="top_and_bottom_line">Enclosed_______________________________________________________________________________________________</th>
            <td></td>
            </tr>
            </table>
  
          );

        }else if(this.state.tenant_list[i].rubs != 0){
          // meter table at end of meter charge
          this.res[i].push(
            <table class="place_in_center">

                <tr class="spaceUnder">
                <tr>Total Building Monthly Electrical Bill</tr>
                <tr>$ {meter_total_charge}</tr>
                <td></td>
                </tr>

                <tr class="spaceUnder">
                <tr>Tenant Square Footage Share</tr>
                <tr>{this.state.tenant_list[i].rubs * 100} %</tr>
                <td></td>
                </tr>

                <tr class="spaceUnder">
                <tr>Tenant Share of Electric Bill</tr>
                <tr>$ {total_tenant_share}</tr>
                <td></td>
                </tr>

                <tr class="spaceUnder">
                <tr>Please make check payable to Property Tech LLc</tr>
                <td></td>
                </tr>
            </table>
    
            );

          this.res[i].push(
            <table>

                <tr class="spaceUnder">
                <tr>Due upon recipt</tr>
                <td></td>
                </tr>

                <tr class="spaceUnder">
                <tr>Thank You,</tr>
                <td></td>
                </tr>

                <tr class="spaceUnder">
                <tr>Property Tech LLC</tr>
                <td></td>
                </tr>

                <tr>
                <th class="top_and_bottom_line">Enclosed_______________________________________________________________________________________________</th>
                <td></td>
                </tr>
                </table>  
          );
          
          
            
        }     

      }
      this.setState({sub_meter_size : submeter_number});
      this.setState({meter_size : meter_number});

  };

  generateIndividual = () =>{
    var matrix = [];
    var tenant_list_size = this.state.tenant_list.length;

    for ( var i = 0; i < tenant_list_size; i++ ) {
        matrix[i] = []; 
    }
    this.print = matrix;


    for(var c=0; c< tenant_list_size; c++){
      var i_d = this.res[c][0];

      this.print[c].push(
        <div id={'pdf'+c+this.state.tenant_list[c].tenant_id}>{this.res[c]}</div>
      )
    }

  }
  

  printDocument() {
    for(var i = 0; i < this.state.tenant_list.length; i++){
      htmlToImage.toPng(document.getElementById('pdf'+i+this.state.tenant_list[i].tenant_id), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        const pdf = new jsPDF();          
        pdf.addImage(dataUrl, 'PNG', 0, 0);
        pdf.save("download.pdf");  //'pdf+'tenant_id+from_date+to_date
      });

    // for(var a = 0; a<this.state.tenant_list.length; a++){
    // const input = document.getElementById(a+this.state.tenant_list[a].tenant_id);
    // html2canvas(input)
    //   .then((canvas) => {
    //     const imgData = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF("p", "mm", "a4");
    //     var width = pdf.internal.pageSize.getWidth();
    //     var height = pdf.internal.pageSize.getHeight();
        

        
    //     if(this.sub_meter_size >=10){
    //       pdf.addImage(imgData, 'JPEG', 0, 0, width, height*0.75);
    //     }
    //     else if (this.sub_meter_size <10 && this.sub_meter_size >=5){
    //       pdf.addImage(imgData, 'JPEG', 0, 0, width, height*0.5);
    //     }
    //     else if (this.sub_meter_size < 5 && this.sub_meter_size >=0){
    //       pdf.addImage(imgData, 'JPEG', 0, 0, width, height*0.3);
    //     }

    //     // pdf.addImage(imgData, 'JPEG', 0, 0, width, height*0.85);
    //     pdf.save("download.pdf");

          
    //   });
    // }
  }

  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>
          View PDF in dialog window
        </Button>
        <Dialog fullScreen open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogContent>
            <DialogContentText></DialogContentText>
            <div>{this.print}</div>
            <button onClick={this.printDocument}>PDF</button>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default IndividualTenantInvoice;