import React, {Component} from 'react';

import ToggleField from '../../Layout/Fields/ToggleField';

class BooleanSettingsField extends Component {

  constructor(props) {
    super(props);

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(name,value) {
    var field = {
      name : name,
      source : this.props.source,
      value : value
    };

    this.props.onFieldChange(field);
  }

  render() {

    var display = false;
    var checkbox = null;
    if(this.props.field != null && this.props.field[this.props.source] != null &&
       this.props.field[this.props.source][this.props.name] !== undefined){
      checkbox = this.props.field[this.props.source][this.props.name];
      display = true;
    }

    return (
      <div className="setup-field version-2" style={{display : display ? "block":"none"}}>
          <ToggleField
            label={this.props.label}
            name={this.props.name}
            checked={  checkbox != null  ? checkbox : false }
            onChange={this.handleFieldChange}
          />
      </div>
    );
  }

}
export default BooleanSettingsField;
