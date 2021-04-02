import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import WhatIsProRataShare from "./WhatIsProRataShare.js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

{
  /* need to import totalBuildingFt value from database 
    need to save entered rubs and tenantFt into database
*/
}
class RUBS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rubs: "",
      yes: false,
      no: false,
      totalBuildingFt: this.props.totalBuildingFt,
      tenantFt: "",
    };
    this.onChangeYes = this.onChangeYes.bind(this);
    this.onChangeNo = this.onChangeNo.bind(this);
    this.changeRUBS = this.changeRUBS.bind(this);
    this.changeTenantFt = this.changeTenantFt.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  changeRUBS(event) {
    event.preventDefault();
    this.setState({
      rubs: event.target.value,
    });
  }

  changeTenantFt(event) {
    event.preventDefault();
    this.setState({
      tenantFt: event.target.value,
    });
  }

  calculate(event) {
    {
      /* should specify a way to calculate rubs based on tenantFt and then save into rubs variable*/
    }
    event.preventDefault();
  }

  onChangeYes(event) {
    event.preventDefault();
    this.setState({
      yes: event.target.checked,
      no: false,
    });
  }

  onChangeNo(event) {
    event.preventDefault();
    this.setState({
      no: event.target.checked,
      yes: false,
    });
  }

  render() {
    const isYes = this.state.yes;
    const isNo = this.state.no;
    return (
      <div>
        <FormControl>
          <FormLabel>
            Is there a RUBS?
            <WhatIsProRataShare />
          </FormLabel>
          <FormGroup row>
            <FormControlLabel control={<Checkbox checked={this.state.yes} onChange={this.onChangeYes} name="yes" color="primary" />} label="yes" />
            <FormControlLabel control={<Checkbox checked={this.state.no} onChange={this.onChangeNo} name="no" color="primary" />} label="no" />
          </FormGroup>
          <DialogContent></DialogContent>
          <div>
            {isYes ? (
              <div>
                <TextField autoFocus margin="dense" id="rubs" label="Enter RUBS" type="text" onChange={this.changeRUBS} fullWidth />
              </div>
            ) : null}
            {isNo ? (
              <div>
                <div>Total buildings square footage: {this.totalBuildingFt}</div>
                <TextField autoFocus margin="dense" id="tenantFt" label="Enter tenant square footage" type="text" onChange={this.changeTenantFt} fullWidth />
                <Button onClick={this.calculate} color="primary">
                  Calculate
                </Button>
              </div>
            ) : null}
          </div>
        </FormControl>
      </div>
    );
  }
}

export default RUBS;
