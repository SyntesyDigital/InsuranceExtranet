import React, {Component} from 'react';

import ToggleField from '../../../Layout/Fields/ToggleField';
import SelectField from '../../../Layout/Fields/SelectField';

import {
  DATE_TYPE_SYSTEM,
  DATE_TYPE_PARAMETER
} from './../../constants';

export function processDefaultSettingsProps(nextProps,state){
  var checkbox = null;
  var value = "";
  
  //now we are sure the field is defined 
  var fieldValue = nextProps.field[nextProps.source][nextProps.name];
  checkbox = fieldValue != null;
  value = fieldValue == null ?
      getDefaultValue() : fieldValue;

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

/**
*   Define default value.
*/
export function getDefaultValue() {
    return {
      type : '',
      parameter : ''
    };
}

class MaxDateSettingsField extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checkbox : null,
      value : getDefaultValue(),
      typeOptions : [{
          name : '---',
          value : ''
        },
        {
          name : 'System',
          value : DATE_TYPE_SYSTEM
        },
        {
          name : 'Parametre',
          value : DATE_TYPE_PARAMETER
        }
      ],
      systemOptions : [{
          name : '---',
          value : ''
        },
        {
          name : 'Date actuelle',
          value : '_now'
        }
      ]

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

  /**
   *  Define what happen when input change
   */
  handleInputChange(event) {

    /*
    var value = this.state.value;
    value[event.target.name] = event.target.value;

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : value
    };

    console.log("handleInputChange :: ",field);

    this.props.onFieldChange(field);
    */
  }

  handleTypeChange(name,value) {

    var stateValue = this.state.value;

    stateValue.type = value;
    stateValue.parameter = '';

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : stateValue
    };

    console.log("handleTypeChange :: ",field);

    this.props.onFieldChange(field);
  }

  handleParameterChange(name,value) {
    var stateValue = this.state.value;

    stateValue.parameter = value;

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : stateValue
    };

    console.log("handleParameterChange :: ",field);

    this.props.onFieldChange(field);
  }

  getValues() {
    if(this.state.value.type != ''){
      if(this.state.value.type == DATE_TYPE_SYSTEM){
        return this.state.systemOptions;
      }
      else {
        var parametersArray = this.props.parameters.map((item) => {
          return {
            name : item.name,
            value : item.identifier
          };
        });
        parametersArray.unshift({
          name : "---",
          value : ""
        });
        return parametersArray;
      }
    }
    return [];
  }

  /**
  *   Render the custom configuration for this field.
  */
  renderInputs() {

    return (
      <div>
        <SelectField
          label="Type"
          name="type"
          value={this.state.value.type}
          arrayOfOptions={this.state.typeOptions}
          onChange={this.handleTypeChange.bind(this)}
        />
        <SelectField
          label="Valeur (format accepté DD/MM/YYYY)"
          name="value"
          value={this.state.value.parameter}
          arrayOfOptions={this.getValues()}
          onChange={this.handleParameterChange.bind(this)}
        />
      </div>
    );
  }

  render() {

    console.log("MaxDateSettingsField :: render ");

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
            {this.renderInputs()}
          </div>

        </div>
      </div>

    );
  }

}
export default MaxDateSettingsField;
