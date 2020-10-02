import React, {Component} from 'react';
import axios from 'axios';
import LabelTooltip from '../../../Common/LabelTooltip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
      fontSize: 18,
  },
});

import {
  HIDDEN_FIELD
} from './../constants';

import {
  processBoby,
  getUrlParameters,
  joinUrls,
  updateParametersWithValues,
  hasEmptyParameters
} from './../functions/';

class RadioField extends Component
{
  constructor(props){
    super(props);

    this.state = {
      addClassBordered: false,
    }
    this.handleOnChange = this.handleOnChange.bind(this);

    const {boby,bobyParameters} = processBoby(
      this.props.field.boby,
      this.props.parameters
    );

    this.state = {
      loading : true,
      data : [],
      boby : boby,
      bobyParameters : bobyParameters,
      parameters : this.props.parameters,
      display : true,
      waitingForParameters : false  //true when parameters need are not yet set
    };

    if(this.hasBobyParameters()){
      this.state.waitingForParameters = true;
    }
  }

  componentDidMount() {
    //if has no parameters load directly
    if(!this.hasBobyParameters()){
      this.loadData();
    }
  }

  /**
   * 
   */
  hasBobyParameters() {
    return this.state.bobyParameters != null;
  }

  /**
   * Join parameters coming from URL and parameters coming from values
   */
  processUrlParameters() {
    var parameters = this.state.parameters;
    var bobyParametersURL = this.hasBobyParameters() ? 
      getUrlParameters(this.state.bobyParameters) : '';
    
    return joinUrls([parameters,bobyParametersURL]);
  }

  componentDidUpdate(prevProps, prevState) {
    
    this.processBobyParametersLoaded(prevProps, prevState);

  }

  /**
   * Check for every update the algorithm if necessary perameters
   */
  processBobyParametersLoaded(prevProps, prevState) {

    //if no boby parameters
    if(!this.hasBobyParameters()) {
      return null;
    }

    //update parameters and check if necessary to update
    const {hasChanged,parameters} = updateParametersWithValues(
      this.state.bobyParameters,
      this.props.values
    );

    //console.log("updateParametersWithValues :: ",{hasChanged,parameters});

    if(hasChanged){
      //check if there is parameters not defined yet
      var empty = hasEmptyParameters(parameters);

      var self = this;
      this.setState({
        bobyParameters : parameters,
        waitingForParameters : empty,
        data : [],
      },function() {
        if(!empty){
          //if is not wainting for parameters to define
          //clean values
          self.cleanValue();

          self.loadData();
        }
      });
    }

  }

  

  loadData() {

      var self = this;

      this.setState({
        loading : true,
        data : []
      },function(){

        axios.get(ASSETS+'architect/elements/select/data/'+this.state.boby+"?"+this.processUrlParameters())
          .then(function(response) {
            if(response.status == 200 && response.data.data !== undefined){

              var display = false;

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
                display : display
              });

            }
          })
          .catch(function (error) {
            console.error(error);
          });
      });
  }

  setHidden() {
    this.props.onFieldChange({
      name : this.props.field.identifier,
      value : HIDDEN_FIELD
    });
  }

  cleanValue() {
    this.props.onFieldChange({
      name : this.props.field.identifier,
      value : ''
    });
  }

  setUniqueValue(value) {
    this.props.onFieldChange({
      name : this.props.field.identifier,
      value : value
    });
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
      name : this.props.field.identifier,
      value : event.target.value
    });
  }

  renderOptions() {

    const value = this.props.value ? this.props.value : ''; 

   return this.state.data.map((item, index) => {
        const bordered = item.value == value ? 'bordered' : '';
        const checked = item.value == value ? true : false;
        return (
            <FormControlLabel
                key={index}
                value={item.value}
                control={
                    <Radio
                        color="primary"
                        onChange={this.handleOnChange.bind(this)}
                        value={item.value}
                        checked={checked}
                    />
                }
                label={item.name}
                labelPlacement="end"
                className={bordered + " radio-field-label"}
            />
        )
    })


  }

  render() {

    const {field} = this.props;
    let defaultValue = this.state.loading ? 'Chargement...' : '';
    defaultValue = this.state.waitingForParameters ? 'En attente de paramètres...' : defaultValue;
    //defaultValue = this.state.parameters != null ? defaultValue : 'Paramètres insuffisants';
    const errors = this.props.error ? ' has-error' : '';
    const display = this.state.display;

    let isRequired = field.rules.required !== undefined ?
      field.rules.required : false;

    let hasDescription = this.props.field.settings.description !== undefined ?
      this.props.field.settings.description : false;

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
        <ThemeProvider theme={theme}>
          <FormControl component="fieldset" className={'container-radio-field'}>
              <label className="bmd-label-floating">
                {field.name} 
                {isRequired &&
                  <span className="required">&nbsp; *</span>
                }
                {hasDescription && 
                    <LabelTooltip 
                        description={this.props.field.settings.description ? 
                            this.props.field.settings.description : ''}
                    />
                }
              </label>
              <div>
                {defaultValue}
              </div>
              <RadioGroup 
                  aria-label="position" 
                  name="position" 
              >
                  {this.renderOptions()}
              </RadioGroup>
          </FormControl>
        </ThemeProvider>
      </div>

    );
  }

}

export default RadioField;
