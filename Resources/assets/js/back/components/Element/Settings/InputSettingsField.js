import React, {Component} from 'react';
import { render } from 'react-dom';

import SettingsField from './SettingsField';
import InputField from '../../Layout/Fields/InputField';

class InputSettingsField extends Component {

  constructor(props) {
    super(props);
  }

  /**
   *  Define what happen when input change
   */
  handleInputChange(name,value) {

    var fieldValue = this.props.field[this.props.source][this.props.name];

    fieldValue = value;

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : fieldValue
    };

    console.log("handleInputChange :: ",field);

    this.props.onFieldChange(field);
    
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
        defaultValue={''}
      >

        <InputField
          label={this.props.inputLabel}
          name={this.props.name}
          value={value != null ? value : ''}
          onChange={this.handleInputChange.bind(this)}
        />

      </SettingsField>
    );
  }

}
export default InputSettingsField;
