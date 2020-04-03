import React, {Component} from 'react';

import SettingsField from './SettingsField';

class BooleanSettingsField extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(this.props.field == null || this.props.field[this.props.source] == null || 
      this.props.field[this.props.source][this.props.name] === undefined)
      return null;

    return (
      <SettingsField
        field={this.props.field}
        onFieldChange={this.props.onFieldChange}
        label={this.props.label}
        name={this.props.name}
        source={this.props.source}
        defaultValue={true}
      />
    );
  }

}
export default BooleanSettingsField;
