import React, {Component} from 'react';
import { render } from 'react-dom';

import SettingsField from './../../../Settings/SettingsField';
import InputField from '../../../../Layout/Fields/InputField';
import SelectField from '../../../../Layout/Fields/SelectField';


class FieldOperationSettingsField extends Component {

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   *  Define what happen when input change
   */
  handleInputChange(name,value) {

    var fieldValue = this.props.field[this.props.source][this.props.name];

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : this.getValue(fieldValue,name,value)
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
      field : "",
      operation : ""
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
        
        <SelectField
          label={'Champ'}
          name={'field'}
          value={value.field}
          arrayOfOptions={this.props.fields.map((item) => {
            return { name: item.name+" ( id : "+item.identifier+")", value: item.identifier };
          })}
          onChange={this.handleInputChange.bind(this)}
        />


        <InputField
          label={'Valeur ou opération'}
          name={'operation'}
          value={value.operation}
          onChange={this.handleInputChange.bind(this)}
        />
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
export default FieldOperationSettingsField;
