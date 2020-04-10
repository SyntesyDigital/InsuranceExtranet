import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ImmatField extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      addClassBordered: false,
      error : false
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

  handleOnChange(event)
  {

    var index = this.getFormatIndex(event.target.value);

    if(index != null){

      var value = this.getValueFromRegex(index,event.target.value);
      console.log("ImmatField :: handleOnChange (index,event.target.value,value) ",
        index,event.target.value,value
      );

      this.setState({
        error : false
      });

      this.props.onFieldChange({
        name : event.target.name,
        value : value
      });

    }
    else {
      this.props.onFieldChange({
        name : event.target.name,
        value : ''
      });

      this.setState({
        error : true
      });

    }
  }

  getValueFromRegex(index,value) {
    var result = "";
    if(index == 0 || index == 1){
      //revert numbers and remove spaces
      var valueArray = value.split(" ");
      result = valueArray[2]+valueArray[1]+valueArray[0];
      return result;
    }
    else if(index == 2){
      //remove -
      return value.split("-").join("");
    }
    else if(index == 3){
      //remove spaces
      return value.split(" ").join("");
    }
    else {
      return "";
    }
  }

  getFormatIndex(value) {
    //check format FNI 9999 AAA 999 or 9999 AA 99
    //check SIV AA-999-AA
    //2 routes AA 999 A

    var formats = [
      /^[0-9]{4} [A-Z]{3} [0-9]{3}$/g, 
      /^[0-9]{4} [A-Z]{2} [0-9]{2}$/g, 
      /^[A-Z]{2}-[1-9]{3}-[A-Z]{2}$/g, 
      /^[A-Z]{2} [1-9]{3} [A-Z]{1}$/g, 
    ];

    var regex = "";

    for(var index in formats){
      regex = formats[index];
      var found = value.match(regex);
      //console.log("processFormat :: (value,regex,index,found)", value,regex,index,found);

      if(found){
        return index;
      }
    }
    return null;
  }

  render() {

    const {field} = this.props;
    const {error} = this.state;
    const errors = this.props.error || error ? ' has-error' : '';
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

      <div className={"form-group immat-field bmd-form-group" + (errors)}>
        <label className="bmd-label-floating">
            {field.name} 
            {isRequired &&
              <span className="required">&nbsp; *</span>
            }
        </label>
        <input
            type="text"
            className={"form-control " + (textFieldClass.join(' '))}
            name={field.identifier}
            placeholder="FNI 9999 AAA 999, SIV AA-999-AA ou AA 999 A"
            //value={this.props.value}
            onChange={this.handleOnChange.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            onFocus={this.handleFocus.bind(this)}
        />
      </div>
      
    );
  }

}

export default ImmatField;

ImmatField.propTypes = {
  value: PropTypes.string,
  isFilled: PropTypes.bool,
  onChange: PropTypes.func
};