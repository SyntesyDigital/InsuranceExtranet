import React, {Component} from 'react';
import { render } from 'react-dom';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import {
  getDatepickerFormat
} from './../../functions';

export function processDefaultSettingsProps(nextProps,state){
  var checkbox = null;
  var input = "";
  var display = false;

  //console.log("DefaultSettingsField :: componentWillRecieveProps");
  //console.log(nextProps);

  if(nextProps.field != null && nextProps.field[nextProps.source] != null &&
     nextProps.field[nextProps.source][nextProps.name] !== undefined){

    var fieldValue = nextProps.field[nextProps.source][nextProps.name];

    checkbox = fieldValue != null;
    display = true;

    //console.log("fieldValue :: ",fieldValue);

    /*
    if(nextProps.field.type == DATE){
      input = fieldValue != null && fieldValue != '' ? fieldValue : null
    }
    else {
      input = fieldValue == null ?
        '' : fieldValue;
    }
    */

    input = fieldValue == null ?
      '' : fieldValue;

    //console.log("DefaultSettingsField :: input :: ",input);
  }

  if(input != state.input || checkbox != state.checkbox || display != state.display){

    //console.log("DefaultSettingsField :: update new state ",input,checkbox,display);
    //console.log("DefaultSettingsField :: state ",state);

    return {
      checkbox : checkbox,
      input : input,
      display : display
    };
  }
  else {
    return null;
  }
}

class DefaultSettingsField extends Component {

  constructor(props) {
    super(props);

    var checkbox = null;
    var input = "";
    var display = false;

    this.state = {
      checkbox : checkbox,
      input : input,
      display : display
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
  componentWillReceiveProps(nextProps){
    this.processProps(nextProps);
  }
  */

  handleFieldChange(event) {

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : event.target.checked ? "" : null
    };

    this.props.onFieldChange(field);
  }

  handleInputChange(event) {

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : event.target.value
    };

    this.props.onFieldChange(field);

  }

  handleDateChange(date) {

    console.log("DefaultSettingsField :: handleDateChange :: ",this.getDateFormat(),date.format(this.getDateFormat()));

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : date.format(this.getDateFormat())
    };

    this.props.onFieldChange(field);
  }

  getDateFormat() {

    if(!this.state.display)
      return 'DD/MM/YYYY';

    const {settings} = this.props.field;

    return getDatepickerFormat(settings.format);

  }

  isTime() {
    if(!this.state.display)
      return false;

    const {settings} = this.props.field;

    if(settings.format !== undefined){
      if(settings.format == "hour")
        return true;
    }

    return false;
  }

  renderInput() {
    if(!this.state.display)
      return null;

    const {input} = this.state;

    console.log("DefaultSettingsField :: this.state.input => ",input);

    switch(this.props.field.type){
      /*
      case DATE:
        return (
          <DatePicker
              className={"form-control "}
              selected={input}
              onChange={this.handleDateChange.bind(this)}
              dateFormat={this.getDateFormat()}
              timeIntervals={15}
              locale="fr"
              showTimeSelect={this.isTime()}
              showTimeSelectOnly={this.isTime()}
              //showMonthYearPicker={this.isMonthYear()}
              timeCaption="Heure"
              timeFormat="HH:mm"
              //onBlur={this.handleOnBlur.bind(this)}
          />
        );
      */
      case NUMBER:
        return (
          <input type="number" name="" className="form-control" value={this.state.input} onChange={this.handleInputChange}/>
        );
      default:
        return (
          <input type="text" name="" className="form-control" value={this.state.input} onChange={this.handleInputChange}/>
        );
    }

  }

  render() {

    console.log("DefaultSettingsField :: render ");

    const {checkbox,input} = this.state;

    return (

      <div style={{display : this.state.display ? 'block' : 'none'}}>
        <div className="setup-field" >
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
               {this.renderInput()}
            </div>
          </div>

        </div>
      </div>

    );
  }

}
export default DefaultSettingsField;
