import React, {Component} from 'react';
import { render } from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class RichtextField extends Component
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

  handleOnChange(event) {

    this.props.onFieldChange({
      name : event.target.name,
      value : event.target.value
    });

  }

  getNumberFromRules(key) {
    const {rules} = this.props.field;
    
    if(rules[key] !== undefined && rules[key] != null && rules[key] != '' ){
      return parseInt(rules[key]);
    }

    return '';
  }

  render() {

    const {field} = this.props;
    const isRequired = field.rules.required !== undefined ?
      field.rules.required : false;
    const errors = this.props.error ? ' has-error' : '';

    let textFieldClass = ["text-field"];
    if (this.state.addClassBordered || this.props.value != "") {
        textFieldClass.push('bordered');
    }

    var maxCharacters = this.getNumberFromRules('maxCharacters');
    var minCharacters = this.getNumberFromRules('minCharacters');

    return (

      <div className={"form-group bmd-form-group" + (errors)}>
        <label className="bmd-label-floating">
            {field.name} 
            {isRequired &&
              <span className="required">&nbsp; *</span>
            }
            
        </label>

        &nbsp;
            {maxCharacters != "" && 
              ('( Max: '+maxCharacters+' caractères )')
            }
        
        <textarea
          id={field.identifier}
          name={field.identifier}
          className={"form-control " + (textFieldClass.join(' '))}
          value={this.props.value}
          onChange={this.handleOnChange}
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          rows={4}
          maxLength={maxCharacters}
          minLength={minCharacters}

        ></textarea>
      </div>
    );
  }

}

export default RichtextField;
