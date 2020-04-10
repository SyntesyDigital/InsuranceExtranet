import React, {Component} from 'react';
import { render } from 'react-dom';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

//necessary because material ui is using rem. 
const theme = createMuiTheme({
    typography: {
      fontSize: 18,
    },
  });

class CheckField extends Component
{
  constructor(props)
  {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);

  }

  componentWillReceiveProps(nextProps) {

  }

  /*
  handleOnBlur () {
    this.setState({
      errors : !this.isValid(this.props.value)
    });
  }
  */

  handleOnChange(event) {

    this.props.onFieldChange({
      name : this.props.field.identifier,
      value : this.getFieldValue(event.target.checked)
    });

  }

  getConfig() {
    var config = {
      checked : 1,
      unchecked : 0
    };

    var field = this.props.field;

    if(field.settings.booleanValues !== undefined && 
      field.settings.booleanValues != null){
        config = field.settings.booleanValues;
    }

    return config;
  }

  /**
    Returns the value depending on the configuration
  */
  getFieldValue(checked) {
    
    var config = this.getConfig();

    //console.log("CheckField:: getConfig() :: ",config);

    if(checked)
      return config.checked;
    else 
      return config.unchecked;
  }

  getConfigValue(value) {
    var config = this.getConfig();

    if(config.checked == value){
      return true;
    }
    else {
      return false;
    }
  }

  render() {

    const {field} = this.props;
    const errors = this.props.error ? 'is-invalid' : '';
    let isRequired = field.rules.required !== undefined ?
      field.rules.required : false;

    //console.log("errors => ",errors);

    //required can be set also directly with modals
    if(this.props.isModal !== undefined && this.props.isModal &&
      field.required !== undefined){
      isRequired = field.required;
    }
    const value = this.getConfigValue(this.props.value);
    //console.log("CheckField :: getConfigValue()",value);

    return (
      <ThemeProvider theme={theme}>
        <div className="check-field">
            <FormControlLabel
                className={errors}
                control={
                    <Checkbox
                        name={field.identifier}
                        checked={value}
                        value={value}
                        color="primary"
                        onChange={this.handleOnChange.bind(this)}
                    />
                }
                label={field.name + (isRequired ? ' *' : '')}
            />
        </div>
      </ThemeProvider>
    );
  }

}

export default CheckField;
