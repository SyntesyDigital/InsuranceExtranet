import React, {Component} from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import {
  HIDDEN_FIELD
} from './../constants';

import {
  parameteres2Array
} from './../functions/';

class SelectField extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      addClassBordered: false,
    }
    this.handleOnChange = this.handleOnChange.bind(this);

    const {boby,parameters} = this.processBoby(this.props.field.boby);

    this.state = {
      loading : true,
      data : [],
      boby : boby,
      parameters : parameters,
      display : true,
      preloadData : []
    };

    this.loadData();
  }

  componentDidUpdate(prevProps,prevState) {
    const identifier = this.props.field.identifier;
    const {preloadData} = this.state;

    /*
    console.log("SelectField :: componentDidUpdate : (currentValue, oldValue)",
      this.props.value,
      prevProps.value
    );
    */

    if(this.props.value != prevProps.value){
      
      var dataPosition = preloadData.indexOf(this.props.value);
      if(dataPosition != -1){

        //console.log("SelectField :: update preload : (dataPosition,value)",dataPosition,this.state.data[dataPosition].value);
        //if exist the value into preload data, change to veos valu
        this.props.onFieldChange({
          name : identifier,
          value : this.state.data[dataPosition].value
        });
      }
    }
  }

  /**
  *   Clean boby wihout parameters, and check all paremters are defined.
  */
  processBoby(boby) {

    var parameters = parameteres2Array(this.props.parameters);

    if(boby.indexOf('?') != -1){
      //if has parameters
      var bobyArray = boby.split('?');
      boby = bobyArray[0];

      var bobyParams = parameteres2Array(bobyArray[1]);

      for(var key in bobyParams){
        if(parameters[key] === undefined){
          //if any parameters is not defined show error

          return {
            boby : boby,
            parameters : null
          }
        }
      }
    }

    return {
      boby : boby,
      parameters : this.props.parameters
    }
  }

  /**
   * Process data array to allow indeOf to check if exists.
   * @param {*} data 
   */
  processPreloadData(data) {
    var result = [];

    if(data.length == 0 || data[0].value_preload == null){
      return [];
    }

    for(var key in data){
      result.push(data[key].value_preload);
    }
    return result;
  }

  loadData() {

      var self = this;

      if(this.state.parameters == null){
        console.error("Parameter necessary not defined , "+key);
        return;
      }

      axios.get(ASSETS+'architect/elements/select/data/'+this.state.boby+"?"+this.state.parameters)
        .then(function(response) {
          if(response.status == 200 && response.data.data !== undefined){

            var display = false;

            var preloadData = self.processPreloadData(response.data.data);

            if(response.data.data.length == 0){
              //no data set this field as hidden, not needed
              self.setHidden();
            }
            else if(response.data.data.length == 1){
              //only one value, selected it and hide
              self.setUniqueValue(response.data.data[0].value);
            }
            else {
              display = true;
            }

            self.setState({
              data : response.data.data,
              loading : false,
              display : display,
              preloadData : preloadData
            });

          }
        })
        .catch(function (error) {
          console.error(error);
        });
  }

  setHidden() {
    this.props.onFieldChange({
      name : this.props.field.identifier,
      value : HIDDEN_FIELD
    });
  }
  setUniqueValue(value) {
    this.props.onFieldChange({
      name : this.props.field.identifier,
      value : value
    });
  }
  setFromPreload() {

  }

  // ==============================
  // Handlers
  // ==============================

  handleBlur(e){
    this.setState({ 
      addClassBordered: false 
    });
  }

  handleFocus(e){
    this.setState({ 
      addClassBordered: true
    });
  }

  handleOnChange(event)
  {

    this.props.onFieldChange({
      name : event.target.name,
      value : event.target.value
    });

  }

  renderOptions() {

    return this.state.data.map((item,index) =>
      <option value={item.value} key={index}>{item.name}</option>
    );
  }

  render() {

    const {field} = this.props;
    let defaultValue = this.state.loading ? 'Chargement...' : 'Sélectionnez';
    defaultValue = this.state.parameters != null ? defaultValue : 'Paramètres insuffisants';
    const errors = this.props.error ? ' has-error' : '';
    const display = this.state.display;

    let isRequired = field.rules.required !== undefined ?
      field.rules.required : false;

    //required can be set also directly with modals
    if(this.props.isModal !== undefined && this.props.isModal &&
      field.required !== undefined){
      isRequired = field.required;
    }

    let textFieldClass = ["text-field"];
    if (this.state.addClassBordered || this.props.value != "") {
        textFieldClass.push('bordered');
    }

    return (

      <div className={"form-group bmd-form-group" + (errors)} style={{display : display ? 'block' : 'none'}}>
        <label className="bmd-label-floating">
            {field.name} 
            {isRequired &&
              <span className="required">&nbsp; *</span>
            }
        </label>
        <select
          name={field.identifier}
          className={"form-control " + (textFieldClass.join(' '))}
          value={this.props.value}
          onChange={this.handleOnChange.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
        >
          <option value="">{defaultValue}</option>
          {this.renderOptions()}
        </select>
        
      </div>
    );
  }

}

export default SelectField;
