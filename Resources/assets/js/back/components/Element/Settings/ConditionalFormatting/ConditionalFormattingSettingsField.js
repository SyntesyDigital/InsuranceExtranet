import React, {Component} from 'react';
import { render } from 'react-dom';

import ToggleField from '../../../Layout/Fields/ToggleField';
import BoxAddGroup from '../../../Layout/BoxAddGroup';
import Condition from './Condition';

export function processDefaultSettingsProps(nextProps,state){
  var checkbox = null;
  var value = "";
  
  //now we are sure the field is defined 
  var fieldValue = nextProps.value;
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

conditions : [
  {
    value : 'REFUS',
    color : '#f00',
    backgroundColor : '#f00'
  },
  {
    value : 'REFUS',
    color : '#f00',
    backgroundColor : '#f00'
  }
]

*/
export function getDefaultValue() {
    return {
      conditions : []
    };
}

class ConditionalFormattingSettingsField extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checkbox : null,
      value : getDefaultValue(),
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

  handleInputChange(event) {

    var value = this.state.value;
    value[event.target.name] = event.target.value;

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : value
    };

    console.log("handleInputChange :: ",field);

    this.props.onFieldChange(field);
  }

  handleConditionRemove(index){

    var self = this;

    var conditions = self.state.value.conditions;
    conditions.splice(index,1);
    self.updateConditions(conditions);
  }

  updateConditions(conditions) {

    const value = this.state.value;

    value.conditions = conditions;

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : value
    };

    this.props.onFieldChange(field);
  }

  getDefaultConditionValue() {
    return {
      value : '',
      color : '',
      backgroundColor : ''
    };
  }

  handleAddClick(e) {
    e.preventDefault();

    var conditions = this.state.value.conditions;
    conditions.push(this.getDefaultConditionValue());

    this.updateConditions(conditions);
  }

  handleConditionChange(condition,index, name,value) {
    console.log("handleConditionChange :: (condition,index, name,value)", condition,index, name,value);
    
    var conditions = this.state.value.conditions;
    conditions[index][name] = value;

    this.updateConditions(conditions);
  }

  /**
  *   Render the custom configuration for this field.
  */
  renderInputs() {

    return this.state.value.conditions.map((item,index) => 
      <Condition
        item={item}
        index={index}
        onFieldChange={this.handleConditionChange.bind(this,item,index)}
        onRemove={this.handleConditionRemove.bind(this,index)}
      />
    );
  }

  render() {

    console.log("ConditionalFormattingSettingsField :: render ");

    const {checkbox,input} = this.state;

    /*<div style={{display : this.state.display ? 'block' : 'none'}}>*/

    return (
      <div>
        <div className="setup-field version-2 conditional-formatting" >
          <ToggleField 
              label={this.props.label}
              name={this.props.name}
              checked={ this.state.checkbox != null ? checkbox : false }
              onChange={this.handleFieldChange}
            />

          <div className="setup-field-config" style={{display : this.state.checkbox != null && this.state.checkbox ? "block" : "none" }}>
            {this.renderInputs()}
            <BoxAddGroup 
              title='Ajouter condition'
              onClick={this.handleAddClick.bind(this)}
            />
          </div>

        </div>
      </div>

    );
  }

}
export default ConditionalFormattingSettingsField;
