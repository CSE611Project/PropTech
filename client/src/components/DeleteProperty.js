import React from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import PropertyInfo from "./PropertyInfo";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

class DeleteProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      property_id: this.props.property_id,
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidUpdate() {
    if (this.props.property_id !== this.state.property_id) {
      this.setState({
        property_id: this.props.property_id,
      });
    }
  }

  deleteProperty() {
    axios.delete("/property", { data: { property_id: this.state.property_id } }).then((response) => {
      this.props.info.generateTableData();
    });
  }

  handleClickOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  onSubmit(event) {
    this.setState({
      open: false,
    });
    this.deleteProperty();
  }

  render() {
    return (
      <div>
        <Button color="secondary" onClick={this.handleClickOpen}>Delete</Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Delete Propery"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Are you sure you want to delete the chosen property?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Back
            </Button>
            <Button onClick={this.onSubmit} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteProperty;
