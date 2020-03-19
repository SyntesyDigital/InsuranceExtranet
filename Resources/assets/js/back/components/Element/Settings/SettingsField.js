import React, {Component} from 'react';

import ToggleField from '../../Layout/Fields/ToggleField';

export function processDefaultSettingsProps(nextProps,state){
  var checkbox = null;
  var value = "";
  
  //now we are sure the field is defined 
  var fieldValue = nextProps.field[nextProps.source][nextProps.name];
  checkbox = fieldValue != null;
  value = fieldValue == null ?
    nextProps.defaultValue : fieldValue;

  //if something changed update state
  if(value != state.value || checkbox != state.checkbox){
    return {
      checkbox : checkbox,
      value : value
    };
  }
  else {
    return null;
  }
}

class SettingsField extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checkbox : null,
      value : props.defaultValue,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
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
      value : value ? this.props.defaultValue : null
    };

    //process field always with this format
    this.props.onFieldChange(field);
  }

  render() {

    console.log("SettingsField :: render ");

    const {checkbox,input} = this.state;

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
            {this.props.children}
          </div>

        </div>
      </div>

    );
  }

}
export default SettingsField;
