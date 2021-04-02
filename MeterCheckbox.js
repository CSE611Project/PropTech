import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

{/* meter_1 and meter_2 are temporary hardcode variables used for demostration 
    onlyOption specifies whether checkbox allows multiple selection or single selection
    true=single selection, false=multiple selection
*/}
class MeterCheckBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            onlyOption: this.props.onlyOption,
            meter_list: this.props.meter_list,
            meter: '',
            meter_id: '',
            meter_1: false,
            meter_2: false
        }
        this.onChange = this.onChange.bind(this)
        this.onChangeOnlyOption = this.onChangeOnlyOption.bind(this)
        this.onChangeMultiOption = this.onChangeMultiOption.bind(this)
        this.generateTable();
    }

    onChangeOnlyOption(event) {
        {/* this part should also return the chosen meter value */ }
        this.setState({ meter: event.target.value }, () => {
            console.log(`state: ${this.state.meter}, value: ${event.target.value}`); // this is my checking
        });
        this.props.methodfromparent(this.state.meter);
    }

    onChangeMultiOption(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.checked
        })
        this.props.methodfromparent(this.state.meter);
    }

    generateTable() {
        var res = [];
        const onlyOp = this.state.onlyOption;
        let tableData = this.state.meter_list;
        if (OnlyOp === true) {
            for (var i = 0; i < tableData.length; i++) {
                res.push(
                    <FormControlLabel name={tableData[i]} value={tableData[i]} control={<Radio />} label={tableData[i]} />
                )
            }
            this.res = res;
            this.forceUpdate();
        } else {
            for (var i = 0; i < tableData.length; i++) {
                res.push(
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={this.onChangeMultiOption}
                                name={tableData[i]}
                                color="primary"
                            />
                        }
                        label={tableData[i]}
                    />
                )
            }
            this.res = res;
            this.forceUpdate();
        }

    }


    render() {
        const only = this.state.onlyOption;
        return (
            <div>
                {only
                    ? <div>
                        <FormControl>
                            <FormLabel>Which meter number is associated with this submeter?</FormLabel>
                            <RadioGroup aria-label="meter" onChange={this.onChangeOnlyOption}>
                                {this.res}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    : <FormControl>
                        <FormLabel>Which meter number is associated with this tenant?</FormLabel>
                        <FormGroup column>
                            {this.res}
                        </FormGroup>
                    </FormControl>
                }
            </div>
        );
    }

}

export default MeterCheckBox;