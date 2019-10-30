import React, {Component} from 'react';
import { render } from 'react-dom';

import {
  VISIBILITY_HIDE,
  VISIBILITY_SHOW
} from './../constants';

import ConditionsModal from './Visibility/ConditionsModal';

/**
*   Settings with conditional language to define if field is visible or not
*/
class VisibilitySettingsField extends Component {

  constructor(props) {
    super(props);


    var checkbox = null;
    var value = this.getDefaultVisibilityValue();
    var display = false;

    this.state = {
      checkbox : checkbox,
      value : value,
      display : display,
      modalDisplay : false,
      conditionIndex : null
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.visibilityOptions = [
      {
          name : 'Ocultar',
          value : VISIBILITY_HIDE,
      },
      {
          name : 'Mostrar',
          value : VISIBILITY_SHOW
      }
    ];
  }

  /**
  *   Conditions have by default the opposite default condition, hide or show.
  */
  getConditionalAction() {

    const value = this.state.value;

    if(value !== undefined && value != null && value.initialValue !== undefined){
        for(var key in this.visibilityOptions){
          if(this.visibilityOptions[key].value != value.initialValue){
            return this.visibilityOptions[key];
          }
        }
    }
    return null;
  }

  getConditions() {

    const value = this.state.value;

    if(value !== undefined && value != null && value.conditions !== undefined){
      return value.conditions;
    }
    return [];
  }



  componentDidMount(){
    this.processProps(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.processProps(nextProps);
  }

  processProps(nextProps){
    var checkbox = null;
    var value = "";
    var display = false;



    if(nextProps.field != null && nextProps.field[nextProps.source] != null &&
       nextProps.field[nextProps.source][nextProps.name] !== undefined){

      checkbox = nextProps.field[nextProps.source][nextProps.name] != null;
      display = true;

      value = nextProps.field[nextProps.source][nextProps.name] == null ?
        this.getDefaultVisibilityValue() : nextProps.field[nextProps.source][nextProps.name];

      console.log("VisibilitySettingsField :: componentWillRecieveProps",nextProps.field[nextProps.source][nextProps.name]);
    }

    this.setState({
      checkbox : checkbox,
      value : value,
      display : display
    });
  }

  getDefaultVisibilityValue() {
    return {
      initialValue : '',
      conditions : []
    };

    /*
      {
        'initialValue' : 'hide',
        'conditions' : [
          {
            'action' : '' //opposite by default
            'join' : 'and/or' //only appear second condition
            'type' : 'parameters',
            'name' : ,
            'operator : '=,!=',
            'options : [],  //list of options
            'values' : [] //selected options

          },

        ]
      }
    */
  }

  //update state from formated value
  setVisibilityValue(initialValue,conditions) {
    //proces if needed
    return {
      'initialValue' : initialValue,
      'conditions' : conditions
    };
  }


  //get value to process field
  getVisibilityValue() {
    return this.state.value;
  }


  handleFieldChange(event) {

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : event.target.checked ? this.state.value : null
    };

    this.props.onFieldChange(field);
  }

  handleInputChange(event) {

    const value = this.getVisibilityValue();

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : this.setVisibilityValue(
        event.target.value,
        value.conditions
      )
    };

    this.props.onFieldChange(field);
  }

  renderOptions() {
    return (this.visibilityOptions.map((item,i) => (
        <option value={item.value} key={i}>{item.name}</option>
      ))
    );
  }

  renderConditions() {

  }

  openModal(e) {
    e.preventDefault();

    const value = this.getVisibilityValue();
    value.conditions.push(this.getDefaultConditionValue());

    this.setState({
      modalDisplay : true,
      value : value
    });
  }

  getDefaultConditionValue() {
    return {
      action : '', //opposite by default
      join : 'and/or', //only appear second condition
      type : 'parameters',
      name : ,
      operator : '=,!=',
      options : [],  //list of options
      values : [] //selected options
    }
  }

  handleModalClose() {
    this.setState({
      modalDisplay : false
    });
  }

  render() {

    const {checkbox,value} = this.state;

    return (

      <div style={{display : this.state.display ? 'block' : 'none'}} className="visibility-settings-field">

        <ConditionsModal
          display={this.state.modalDisplay}
          onModalClose={this.handleModalClose.bind(this)}
          initialValue={this.getConditionalAction()}
          conditions={this.getConditions()}
          conditionIndex={this.state.selectedContidion}
        />

        <div className="setup-field">
          <div className="togglebutton">
            <label>
                <input type="checkbox"
                  name={this.props.name}
                  checked={ this.state.checkbox != null ? checkbox : false }
                  onChange={this.handleFieldChange}
                />
                {this.props.label}
            </label>
          </div>


          <div className="setup-field-config" style={{display : this.state.checkbox != null && this.state.checkbox ? "block" : "none" }}>
            <div className="form-group bmd-form-group">
               <label htmlFor="num" className="bmd-label-floating">{this.props.inputLabel}</label>
               <select className="form-control" name="default" value={value.initialValue} onChange={this.handleInputChange} >
                 {this.renderOptions()}
               </select>
            </div>
            <div className="conditions-list">
              {this.renderConditions()}
            </div>
            <div class="add-row-block">
              <a href="" class="btn btn-default" onClick={this.openModal.bind(this)}>
                <i class="fa fa-plus-circle"></i> Ajouter une condition
              </a>
            </div>
          </div>

        </div>
      </div>

    );
  }

}
export default VisibilitySettingsField;
