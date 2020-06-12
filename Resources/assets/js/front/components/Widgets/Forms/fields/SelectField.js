import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import {
  HIDDEN_FIELD
} from './../constants';
import {
  parameteres2Array
} from './../functions/';

class SelectField extends Component {

  constructor(props) {

    super(props);

    this.state = {
      addClassBordered: false,
    }

    this.handleOnChange = this.handleOnChange.bind(this);

    const { boby, parameters } = this.processBoby(this.props.field.boby);

    this.state = {
      loading: true,
      data: [],
      boby: boby,
      parameters: parameters,
      display: true,
      preloadData: [],
      selectedOption: null,
    };

    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    const identifier = this.props.field.identifier;
    const { preloadData } = this.state;

    //console.log("SelectField :: (this.props.value,dataPosition,preloadData)",this.props.value,dataPosition,preloadData);

    /*    
    console.log("SelectField :: componentDidUpdate : (currentValue, oldValue)",
      this.props.value,
      prevProps.value
    );
    */

    if (this.props.value != prevProps.value) {

      console.log("SelectField :: is diferent! (currentValue, oldValue,preloadData)", this.props.value,preloadData, prevProps.value);

      var dataPosition = preloadData.indexOf(this.props.value);
      
      if (dataPosition != -1) {

        //console.log("SelectField :: update preload : (dataPosition,value)",dataPosition,this.state.data[dataPosition].value);
        //if exist the value into preload data, change to veos valu
        this.props.onFieldChange({
          name: identifier,
          value: this.state.data[dataPosition].value
        });
      }
    }
  }

  /**
  *   Clean boby wihout parameters, and check all paremters are defined.
  */
  processBoby(boby) {

    var parameters = parameteres2Array(this.props.parameters);

    if (boby.indexOf('?') != -1) {
      //if has parameters
      var bobyArray = boby.split('?');
      boby = bobyArray[0];

      var bobyParams = parameteres2Array(bobyArray[1]);

      for (var key in bobyParams) {
        if (parameters[key] === undefined) {
          //if any parameters is not defined show error

          return {
            boby: boby,
            parameters: null
          }
        }
      }
    }

    return {
      boby: boby,
      parameters: this.props.parameters
    }
  }

  /**
   * Process data array to allow indeOf to check if exists.
   * @param {*} data 
   */
  processPreloadData(data) {
    //first is always empty
    var result = [""];

    if (data.length == 0) {
      return [];
    }

    for (var key in data) {
      if(data[key].value_preload != null){
        result.push(data[key].value_preload);
      }
      else {
        result.push(data[key].value);
      }
      
    }
    return result;
  }

  loadData() {

    var self = this;

    var parameters = this.state.parameters == null ? "" : this.state.parameters;

    axios.get(ASSETS + 'architect/elements/select/data/' + this.state.boby + "?" + parameters)
      .then(function (response) {
        if (response.status == 200 && response.data.data !== undefined) {

          var display = false;

          var preloadData = self.processPreloadData(response.data.data);

          if (response.data.data.length == 0) {
            //no data set this field as hidden, not needed
            self.setHidden();
          }
          else if (response.data.data.length == 1) {
            //only one value, selected it and hide
            self.setUniqueValue(response.data.data[0].value);
          }
          else {
            display = true;
          }

          //add first item with empty result, necessary to remove value
          response.data.data.unshift({
            name : "Sélectionnez",
            value : "",
            value_preload : null
          });

          self.setState({
            data: response.data.data,
            loading: false,
            display: display,
            preloadData: preloadData
          });

        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  setHidden() {
    this.props.onFieldChange({
      name: this.props.field.identifier,
      value: HIDDEN_FIELD
    });
  }

  setUniqueValue(value) {
    this.props.onFieldChange({
      name: this.props.field.identifier,
      value: value
    });
  }

  setFromPreload() {

  }

  // ==============================
  // Handlers
  // ==============================

  handleBlur(e) {
    this.setState({
      addClassBordered: false
    });
  }

  handleFocus(e) {
    this.setState({
      addClassBordered: true
    });
  }

  handleOnChange(option) {

    //console.log("SelectField :: handleOnChange :: option",(option));

    this.props.onFieldChange({
      name: this.props.field.identifier,
      value: option.value
    });
  }

  getOption(value) {
    if (value === undefined || value == null)
      return null;

    for (var index in this.state.data) {
      if (this.state.data[index]['value'] == value)
        return index;
    }
    return null;
  }

  getBorderColor() {
    if(this.props.error) {
      return '1px solid ' + STYLES.elementForm.errorColor;
    }
    else if(this.state.addClassBordered || this.props.value != ""){
      return '1px solid ' + STYLES.elementForm.borderColorInput;
    }
    else {
      return null;
    }
  }

  render() {
    const { field } = this.props;
    let defaultValue = this.state.loading ? 'Chargement...' : 'Sélectionnez';
    defaultValue = this.state.parameters != null ? defaultValue : 'Paramètres insuffisants';
    //const errors = this.props.error ? ' has-error' : '';
    const display = this.state.display;

    let isRequired = field.rules.required !== undefined ?
      field.rules.required : false;

    //required can be set also directly with modals
    if (this.props.isModal !== undefined && this.props.isModal &&
      field.required !== undefined) {
      isRequired = field.required;
    }

    // required for react-select option, value and setting
    const options = this.state.data.map(
      item => ({
        label: item.name,
        value: item.value,
      }));    

    var optionIndex = this.getOption(this.props.value);

    const customStyles = {
      control: (base) => ({
        ...base,
        height: 34,
        minHeight: 34,
        boxShadow: '1 !important',
        border: this.getBorderColor()
      }),
      menu: provided => ({ ...provided, zIndex: 99999 })
    };

    //console.log("SelectField :: value : (options,optionsIndex,this.props.value)",options,optionIndex,this.props.value);

    return (

      <div className={"form-group bmd-form-group"} style={{ display: display ? 'block' : 'none' }}>
        <label className="bmd-label-floating">
          {field.name}
          {isRequired &&
            <span className="required">&nbsp; *</span>
          }
        </label>
        <Select
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          value={options[optionIndex]}
          name={field.identifier}
          defaultValue={optionIndex != null ? options[optionIndex] : ''}
          options={options}
          onChange={this.handleOnChange.bind(this)}
          styles={customStyles}
          placeholder={defaultValue}
          menuContainerStyle={{'zIndex': 999}}
          theme={(theme) => ({
            ...theme,
            borderRadius: STYLES.elementForm.borderRadiusInput,
            height: '34px',
            colors: {
              ...theme.colors,
              primary25: STYLES.elementForm.hoverColorInput,
              primary: STYLES.elementForm.borderColorInput,
            },
          })}
        />
      </div>
    );
  }
}

export default SelectField;
