import React, {Component} from 'react';
import { render } from 'react-dom';

import SettingsField from './../SettingsField';
import InputField from '../../../Layout/Fields/InputField';

import {
  CONDITION_FIELD_TYPE_PARAMETER,
  CONDITION_FIELD_TYPE_CONFIGURABLE
} from './../../constants';

class CurrencySettingsField extends Component {

  constructor(props) {
    super(props);

    this.types = [
      {
        name : "Paramètre",
        value : CONDITION_FIELD_TYPE_PARAMETER
      },
      {
        name : "Champ configurable",
        value : CONDITION_FIELD_TYPE_CONFIGURABLE
      }
    ];

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
      type : CONDITION_FIELD_TYPE_PARAMETER,
      identifier : ""
    }
  }

  renderParameters() {

    var fieldValue = this.props.field[this.props.source][this.props.name];

    if(fieldValue.type == CONDITION_FIELD_TYPE_CONFIGURABLE) {
      return this.props.fields.map((item,index) =>
        <option key={index} value={item.identifier}> {item.name}</option>
      );
    }
    else {
      return this.props.parameters.map((item,index) =>
        <option key={index} value={item.identifier}> {item.name}</option>
      );
    }
  }

  renderTypes() {
    return this.types.map((item,index) =>
      <option key={index} value={item.value}> {item.name}</option>
    );
  }


    /**
    *   Render the custom configuration for this field.
    */
  renderInputs(value) {
    
    return (
      <div>
        <div className="form-group bmd-form-group">
            <label htmlFor="type" className="bmd-label-floating">
              Type of field
            </label>
            <select className="form-control" name="type" value={value.type} onChange={this.handleInputChange} >
              {this.renderTypes()}
            </select>
        </div>

        <div className="form-group bmd-form-group">
          <label htmlFor="identifier" className="bmd-label-floating">
            Field
          </label>
          <select type="text" className="form-control" name="identifier" value={value.identifier} onChange={this.handleInputChange} >
            <option key={-1} value=""> Sélectionner </option>
            {this.renderParameters()}
          </select>
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
export default CurrencySettingsField;
