import React, {Component} from 'react';
import { render } from 'react-dom';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const theme = createMuiTheme({
  typography: {
      fontSize: 18,
  },
});

class YesNoField extends Component
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

    //console.log("YesNoField :: handleOnChange (vaue) ",event.target.value);

    this.props.onFieldChange({
      name : this.props.field.identifier,
      //value : this.getFieldValue(event.target.checked)
      value : event.target.value
    });

  }

  getConfig() {
    var config = {
      checked : '1',
      unchecked : '0'
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

    //console.log("YesNoField:: getConfig() :: ",config);

    if(checked)
      return config.checked;
    else 
      return config.unchecked;
  }

  getConfigValue(value) {
    var config = this.getConfig();

    if(value === undefined || value === "" || value === null){
      return null;
    }

    if(config.checked == value){
      return true;
    }
    else {
      return false;
    }
  }

  renderOption(label,value,currentValue) {
      
      var checked = currentValue === value ? true : false;
      const bordered = checked ? 'bordered' : '';
      //console.log("renderOption (label,value,currentValue,checked) ",label,value,currentValue,checked);

      return (
          <FormControlLabel
              key={label}
              value={value}
              control={
                  <Radio
                      color="primary"
                      value={value}
                      onChange={this.handleOnChange.bind(this)}
                      checked={checked}
                  />
              }
              label={label}
              labelPlacement="end"
              className={bordered}
          />
      );
  }

  render() {

    const {field} = this.props;
    const errors = this.props.error ? ' has-error' : '';
    let isRequired = field.rules.required !== undefined ?
      field.rules.required : false;

    let isHideLabel = field.settings.hidelabel !== undefined ?
    field.settings.hidelabel : false;

    let isLabelInline = field.settings.labelInline !== undefined ?
            field.settings.labelInline : false;

    var colClassLabel = isLabelInline ? 
        'field-container-col col-xs-5' :
        'field-container-col col-xs-12';

    var colClassInput = isLabelInline ? 
        'field-container-col col-xs-7' :
        'field-container-col col-xs-12';

    //console.log("errors => ",errors);

    //required can be set also directly with modals
    if(this.props.isModal !== undefined && this.props.isModal &&
      field.required !== undefined){
      isRequired = field.required;
    }
    //const value = this.getConfigValue(this.props.value);
    //console.log("YesNoField :: getConfigValue()",value);

    return (
      <ThemeProvider theme={theme}>
            <div className={"col-md-12 container-radio-field yes-no-field" + (errors)}>
              <div className={'row field-container'}>
                  <div className={colClassLabel}>
                    <div className="container-text">
                      {!isHideLabel &&
                        <span>{field.name}
                        {isRequired &&
                          <span className="required">&nbsp; *</span>
                        }
                        </span>
                      }
                    </div>
                  </div>
                  <div className={colClassInput}>
                    <div className="container-fields-yes-no">
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="position" name="position">
                                {this.renderOption("Oui",this.getFieldValue(true),this.props.value)}
                                {this.renderOption("Non",this.getFieldValue(false),this.props.value)}
                            </RadioGroup>
                        </FormControl>
                    </div>
                  </div>
              </div>
            </div>
            <div style={{
                  clear: 'both',
                  fontSize: '1px',
                  lineHeight: 0,
                  height: '1px',
                  pointerEvents: 'none',
            }}></div>
        </ThemeProvider>
    );
  }

}

export default YesNoField;
