getDefaultVisibilityimport React, {Component} from 'react';
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
    var value = this.getDefaultVisibility();
    var display = false;

    this.state = {
      checkbox : checkbox,
      value : value,
      display : display,
      modalDisplay : true
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

  componentDidMount(){
    this.processProps(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.processProps(nextProps);
  }

  processProps(nextProps){
    var checkbox = null;
    var value = "";
    var display = false;

    //console.log("valueSettingsField :: componentWillRecieveProps");
    //console.log(nextProps);

    if(nextProps.field != null && nextProps.field[nextProps.source] != null &&
       nextProps.field[nextProps.source][nextProps.name] !== undefined){

      checkbox = nextProps.field[nextProps.source][nextProps.name] != null;
      display = true;

      /*
      value = nextProps.field[nextProps.source][nextProps.name] == null ?
        this.getDefaultVisibility() : this.setValue(nextProps.field[nextProps.source][nextProps.name]);
        */
    }

    this.setState({
      checkbox : checkbox,
      value : value,
      display : display
    });
  }

  getDefaultVisibility() {
    return {
      default : '',
      conditions : []
    };

    /*
      {
        'default' : 'hide',
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
  setVisibility(value) {
    return {
      default : '',
      conditions : []
    };
  }

  //get value to process field
  getValue() {
    return {
      default : '',
      conditions : []
    };
  }

  handleFieldChange(event) {

    var field = {
      name : this.props.name,
      source : this.props.source,
      value : event.target.checked ? this.getValue(this.state.value) : null
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

  renderOptions() {
    return (this.visibilityOptions.map((item,i) => (
        <option value={item.value} key={i}>{item.name}</option>
      ))
    );
  }

  render() {

    const {checkbox,value} = this.state;

    return (

      <div style={{display : this.state.display ? 'block' : 'none'}}>

        <VisibilitySettingsField
          display={this.state.modalDisplay}
        />

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
               <select className="form-control" name="default" value={value} onChange={this.handleInputChange} >
                 {this.renderOptions()}
               </select>
            </div>
          </div>

        </div>
      </div>

    );
  }

}
export default VisibilitySettingsField;
