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
            meters: this.props.meters,
            meter_id: this.props.meter_id,
            meter_1: false,
            meter_2: false
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(event) {
        {/* this part should also return the chosen meter value */ }
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.checked
        })
        console.log(event.target.value)


    }


    render() {
        const only = this.state.onlyOption;
        return (
            <div>
                {only
                    ? <div>
                        <FormControl>
                            <FormLabel>Which meter number is associated with this submeter?</FormLabel>
                            <RadioGroup aria-label="meter" onChange={this.onChange}>
                                <FormControlLabel value="123456" control={<Radio />} label="123456" />
                                <FormControlLabel value="654321" control={<Radio />} label="654321" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    : <FormControl>
                        <FormLabel>Which meter number is associated with this tenant?</FormLabel>
                        <FormGroup column>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.meter_1}
                                        onChange={this.onChange}
                                        name="meter_1"
                                        color="primary"
                                    />
                                }
                                label={this.state.meters}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.meter_2}
                                        onChange={this.onChange}
                                        name="meter_2"
                                        color="primary"
                                    />
                                }
                                label="543321"
                            />
                        </FormGroup>
                    </FormControl>
                }
            </div>
        );
    }

}

export default MeterCheckBox;