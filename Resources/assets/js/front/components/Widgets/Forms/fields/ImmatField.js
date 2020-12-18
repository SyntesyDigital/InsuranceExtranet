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
    else if(index == 10){
      //remove spaces
      var valueArray = value.split(" ");
      result = valueArray[2]+valueArray[1]+valueArray[0];
      return result;
    }
    else if(index == 4){
      //remove spaces
      var valueArray = value.split(" ");
      result = valueArray[2]+valueArray[1]+'0'+valueArray[0];
      return result;
    }
    else if(index == 11){
      //remove spaces
      var valueArray = value.split(" ");
      result = valueArray[2]+valueArray[1]+'00'+valueArray[0];
      return result;
    }
    else if(index == 12){
      //remove spaces
      var valueArray = value.split(" ");
      result = valueArray[2]+valueArray[1]+'000'+valueArray[0];
      return result;
    }
    else if(index > 4){
      return value;
    }
    else {
      return "";
    }
  }

  getFormatIndex(value) {
    //check format FNI 9999 AAA 999 or 9999 AA 99 or 357 CCG 38
    //check SIV AA-999-AA
    //2 routes AA 999 A

    //formats direct result from processment. ( all formats are processed to a format, if user introduce directly
    //this format, it should work also.)
      //999AAA9999
      //99AA9999
      //AA999AA
      //AA999A
      //99AAA999
      //new formats 29-6-2020
      //9999 AAA 11 => 11AAA9999  //10
      //999 AAA 11 => 11AAA0999 //add 0 //4
      //99 AA 11 =>  11AA0099 //add 00  //11
      //9 AA 11 => 11AA0009 // add 000  //12

    var formats = [
      /^[0-9]{4} [A-z]{3} [0-9]{3}$/g, //0
      /^[0-9]{4} [A-z]{2} [0-9]{2}$/g, //1
      /^[A-z]{2}-[0-9]{3}-[A-z]{2}$/g, //2
      /^[A-z]{2} [0-9]{3} [A-z]{1}$/g, //3
      /^[0-9]{3} [A-z]{3} [0-9]{2}$/g, //4
      /^[0-9]{3}[A-z]{3}[0-9]{4}$/g, //5
      /^[0-9]{2}[A-z]{2}[0-9]{4}$/g, //6
      /^[A-z]{2}[0-9]{3}[A-z]{2}$/g, //7
      /^[A-z]{2}[0-9]{3}[A-z]{1}$/g, //8
      /^[0-9]{2}[A-z]{3}[0-9]{3}$/g, //9
      /^[0-9]{4} [A-z]{3} [0-9]{2}$/g, //10
      /^[0-9]{2} [A-z]{2} [0-9]{2}$/g, //11
      /^[0-9]{1} [A-z]{2} [0-9]{2}$/g, //12
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

    let isHideLabel = field.settings.hidelabel !== undefined ?
    field.settings.hidelabel : false;

    let isLabelInline = field.settings.labelInline !== undefined ?
            field.settings.labelInline : false;

        var colClassLabel = isLabelInline ? 
            'field-container-col col-xs-5' :
            'field-container-col col-xs-12';

        var colClassInput = isLabelInline ? 
            'field-container-col col-xs-7' :
            'field-container-col col-xs-12';

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
        <div className={'row field-container'}>
          <div className={colClassLabel}>
            {!isHideLabel &&
              <label className="bmd-label-floating">
                  {field.name} 
                  {isRequired &&
                    <span className="required">&nbsp; *</span>
                  }
              </label>
            }
          </div>
          <div className={colClassInput}>
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
        </div>
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