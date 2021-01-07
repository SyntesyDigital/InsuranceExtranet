import React, {Component} from 'react';
import { render } from 'react-dom';

import SettingsField from './../SettingsField';
import KeyValuesField from './../../../Layout/Fields/KeyValuesField';

class KeyValueSettingsField extends Component {

  constructor(props) {
    super(props);

  }

  /**
   *  Define what happen when input change
   */
  handleFieldChange(name,value) {

    var fieldValue = this.props.field[this.props.source][this.props.name];

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : value
    };

    console.log("KeyValueSettings :: handleInputChange :: ",field);

    this.props.onFieldChange(field);
    
  }

  getDefaultValue() {
    return []
  }


    /**
    *   Render the custom configuration for this field.
    */
  renderInputs(value) {
    
    return (
      <KeyValuesField
            label={''}
            keyLabel={'Identifiant du formulaire'}
            keyPrefix={''}
            valueLabel={'Identifiant de la tableau'}
            value={value}
            name={this.props.name}
            onChange={this.handleFieldChange.bind(this)}
            error={false}
        />
    );
  }

  render() {

    const value = this.props.field[this.props.source][this.props.name];
    //value is null, when setting field is disabled

    console.log("KeyValueSettingsField :: render value ",value);

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
export default KeyValueSettingsField;
