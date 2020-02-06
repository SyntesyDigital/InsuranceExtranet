import React, {Component} from 'react';
import { render } from 'react-dom';

import ToggleField from '../../../Layout/Fields/ToggleField';


export function processDefaultSettingsProps(nextProps,state){
  var checkbox = null;
  var input = "";
  
  //now we are sure the field is defined 
  var fieldValue = nextProps.value;
  checkbox = fieldValue != null;
  input = fieldValue == null ?
      getDefaultValue() : fieldValue;

  //if something changed update state
  if(input != state.input || checkbox != state.checkbox){

    return {
      checkbox : checkbox,
      input : input
    };
  }
  else {
    return null;
  }
}

/**
*   Define default value.
*/
export function getDefaultValue() {
    return {
      checked : 1,
      unchecked : 0
    };
}

class BooleanValuesSettingsField extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checkbox : null,
      input : getDefaultValue(),
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount(){
    this.setState(processDefaultSettingsProps(this.props,this.state));
  }

  static getDerivedStateFromProps(props, state) {
    return processDefaultSettingsProps(props,state);
  }

  /*
  *   Update value when checkbox is defined
  */
  handleFieldChange(name,value) {

    var field = {
      name : name,
      source : this.props.source,
      value : value ? getDefaultValue() : null
    };

    //process field always with this format
    this.props.onFieldChange(field);
  }

  handleInputChange(event) {

    var input = this.state.input;
    input[event.target.name] = event.target.value;

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : input
    };

    console.log("handleInputChange :: ",field);

    this.props.onFieldChange(field);
  }

  /**
  *   Process 
  */
  setValue(input) {
    return {
      checked : input.checked,
      unchecked : input.unchecked
    };
  }

  /**
  *   Render the custom configuration for this field.
  */
  renderInputs() {
    return (
      <div>
        <div className="form-group bmd-form-group">
          <label htmlFor="checked" className="bmd-label-floating">
              Valeur vérifiée
          </label>
          <input type="text" name="checked" className="form-control" id="checked" value={this.state.input.checked} onChange={this.handleInputChange}/>
        </div>
        <div className="form-group bmd-form-group">
          <label htmlFor="unchecked" className="bmd-label-floating">
                Valeur non vérifiée
          </label>
          <input type="text" name="unchecked" className="form-control" id="unchecked" value={this.state.input.unchecked} onChange={this.handleInputChange}/>
        </div>
      </div>
    );
  }

  render() {

    console.log("BooleanValuesSettingsField :: render ");

    const {checkbox,input} = this.state;

    /*<div style={{display : this.state.display ? 'block' : 'none'}}>*/

    return (
      <div>
        <div className="setup-field version-2" >
          <ToggleField 
              label={this.props.label}
              name={this.props.name}
              checked={ this.state.checkbox != null ? checkbox : false }
              onChange={this.handleFieldChange}
            />

          <div className="setup-field-config" style={{display : this.state.checkbox != null && this.state.checkbox ? "block" : "none" }}>
            {this.renderInputs()}
          </div>

        </div>
      </div>

    );
  }

}
export default BooleanValuesSettingsField;
