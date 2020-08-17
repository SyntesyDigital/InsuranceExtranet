import React, {Component} from 'react';
import { render } from 'react-dom';

import SettingsField from './../SettingsField';
import InputField from '../../../Layout/Fields/InputField';

class ExampleSettingsField extends Component {

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
      type : '',
      identifier : ""
    }
  }

  renderInputs(value) {
    
    return (
      <div>
        <InputField
          label={'Type'}
          name={'type'}
          value={value.type}
          onChange={this.handleInputChange}
        />

        <InputField
          label={'Identifier'}
          name={'identifier'}
          value={value.identifier}
          onChange={this.handleInputChange}
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
export default ExampleSettingsField;
