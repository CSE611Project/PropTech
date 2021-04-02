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
        this.onChangeOnlyOption = this.onChangeOnlyOption.bind(this)
        this.onChangeMultiOption = this.onChangeMultiOption.bind(this)
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

    render() {
        const only = this.state.onlyOption;
        return (
            <div>
                {only
                    ? <div>
                        <FormControl>
                            <FormLabel>Which meter number is associated with this submeter?</FormLabel>
                            <RadioGroup aria-label="meter">
                                <FormControlLabel value="123456" control={<Radio onChange={this.onChangeOnlyOption} />} label="123456" />
                                <FormControlLabel value="654321" control={<Radio onChange={this.onChangeOnlyOption} />} label="654321" />
                                <FormControlLabel value="555555" control={<Radio onChange={this.onChangeOnlyOption} />} label="555555" />
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
                                        onChange={this.onChangeMultiOption}
                                        name="meter_1"
                                        value="meter_1"
                                        color="primary"
                                    />
                                }
                                label={this.state.meters}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.meter_2}
                                        onChange={this.onChangeMultiOption}
                                        name="meter_2"
                                        value="meter_2"
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