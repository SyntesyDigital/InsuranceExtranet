import React, {Component} from 'react';
import { render } from 'react-dom';

class NumberField extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      addClassBordered: false,
    }
    this.handleOnChange = this.handleOnChange.bind(this);
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

  handleFocus(e){
      if (e.target.value != '') {
          this.setState({ 
              addClassBordered: false
          });
      }else{
          this.setState({ 
              addClassBordered: true
          });
      }
  }  

  handleOnChange(event)
  {

    var value = parseInt(event.target.value);
    var max = parseInt(this.getNumberFromRules('maxNumber'));
    var min = parseInt(this.getNumberFromRules('minNumber'));

    min = min && min != "" ? min : -Number.MAX_VALUE;
    max = max && max != "" ? max : Number.MAX_VALUE;

    console.log("Number Field :: handleOnChange (value,max,min)",value,max,min);

    if(isNaN(value)){
      this.props.onFieldChange({
        name : event.target.name,
        value : ''
      });
      return;
    }

    if(min != '' && value < min){
      return;
    }
    if(max != '' && value > max){
      return;
    }

    this.props.onFieldChange({
      name : event.target.name,
      value : event.target.value
    });

  }

  getNumberFromRules(key) {
    const {rules} = this.props.field;
    
    if(rules[key] !== undefined && rules[key] != null && rules[key] != '' ){
      return rules[key];
    }

    return '';
  }

  getPlaceholder() {
    var max = this.getNumberFromRules('maxNumber');
    var min = this.getNumberFromRules('minNumber');

    if(max == '' && min == '')
      return '';

    var result = '';

    result += (min != '' ) ? 'minimum '+min+' ' : '';
    result += (min != '' && max != '') ? ', ' : '';
    result += (max != '' ) ? 'maximum '+max+' ' : '';
    

    return result;

  }

  render() {

    const {field} = this.props;
    const errors = this.props.error ? ' has-error' : '';
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

      <div className={"form-group bmd-form-group" + (errors)}>
        <label className="bmd-label-floating">
            {field.name} 
            {isRequired &&
              <span className="required">&nbsp; *</span>
            }
        </label>
        <input type="number" name={field.identifier}
          className={"form-control " + (textFieldClass.join(' '))}
          value={this.props.value}
          max={this.getNumberFromRules('maxNumber')}
          min={this.getNumberFromRules('minNumber')}
          onChange={this.handleOnChange.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          placeholder={this.getPlaceholder()}
        />
      </div>
    );
  }

}

export default NumberField;
