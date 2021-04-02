import "date-fns";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

class DatePicker extends React.Component {
  // The first commit of Material-UI
  constructor(props) {
    super(props);
    this.state = {
      from_date: "",
      to_date: "",
    };
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
  }

  handleFromDateChange(event) {
    this.setState({
      from_date: event.target.value,
    });
    console.log(event.target.value);
  }

  handleToDateChange(event) {
    this.setState({
      to_date: event.target.value,
    });
    console.log(event.target.value);
  }

  render() {
    return (
      <form noValidate>
        <table>
          <td>
            <TextField
              id="from_date"
              label="From"
              type="date"
              defaultValue={this.state.from_date}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleFromDateChange}
            />
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <TextField
              id="to_date"
              label="To"
              type="date"
              defaultValue={this.state.to_date}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleToDateChange}
            />
          </td>
        </table>
      </form>
    );
  }
}

export default DatePicker;
