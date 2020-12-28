import React, {Component} from 'react';
import { render } from 'react-dom';

import SettingsField from './../SettingsField';
import InputField from '../../../Layout/Fields/InputField';

import {
  CONDITION_FIELD_TYPE_PARAMETER,
  CONDITION_FIELD_TYPE_CONFIGURABLE
} from './../../constants';

class UrlSettingsField extends Component {

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   *  Define what happen when input change
   */
  handleInputChange(e) {

    var fieldValue = this.props.field[this.props.source][this.props.name];

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : this.getValue(fieldValue,e.target.name,e.target.value)
    };

    console.log("handleInputChange :: ",field);

    this.props.onFieldChange(field);
    
  }

  /**
   * Process the value depending on the settings state
   */
  getValue(currentValue,name,value) {
    currentValue[name] = value;
    return currentValue;
  }

  getDefaultValue() {
    return {
      url : "",
      parameters : ""
    }
  }

  renderParameters() {

    return this.props.fields.map((item,index) =>
      <option key={index} value={item.identifier}> {item.name}</option>
    );

  }

    /**
    *   Render the custom configuration for this field.
    */
  renderInputs(value) {
    
    return (
      <div>
        <div className="form-group bmd-form-group">
          <label htmlFor="url" className="bmd-label-floating">
            Champ url
          </label>
          <select type="text" className="form-control" name="url" value={value.url} onChange={this.handleInputChange} >
            <option key={-1} value=""> Sélectionner </option>
            {this.renderParameters()}
          </select>
        </div>
      
        <div className="form-group bmd-form-group">
            <label htmlFor="type" className="bmd-label-floating">
              Paramètres
            </label>
            <input className="form-control" type="text" name="parameters" value={value.parameters} onChange={this.handleInputChange} />
        </div>
      </div>
    );
  }

  render() {

    const value = this.props.field[this.props.source][this.props.name];
    //value is null, when setting field is disabled
    return (
      <SettingsField
        field={this.props.field}
        onFieldChange={this.props.onFieldChange}
        label={this.props.label}
        name={this.props.name}
        source={this.props.source}
        defaultValue={this.getDefaultValue()}
      >
        {value &&
            this.renderInputs(value)
        }

      </SettingsField>
    );
  }

}
export default UrlSettingsField;
