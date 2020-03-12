import React, {Component} from 'react';
import { render } from 'react-dom';

class NumberField extends Component
{
  constructor(props)
  {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }


  handleOnChange(event)
  {

    var value = parseInt(event.target.value);
    var max = parseInt(this.getNumberFromRules('maxNumber'));
    var min = parseInt(this.getNumberFromRules('minNumber'));

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

    var result = 'Valeur : ';

    result += (min != '' ) ? '>= '+min+' ' : '';
    result += (min != '' && max != '') ? ', ' : '';
    result += (max != '' ) ? '<= '+max+' ' : '';
    

    return result;

  }

  render() {

    const {field} = this.props;
    const errors = this.props.error ? 'is-invalid' : '';
    let isRequired = field.rules.required !== undefined ?
      field.rules.required : false;

    //required can be set also directly with modals
    if(this.props.isModal !== undefined && this.props.isModal &&
      field.required !== undefined){
      isRequired = field.required;
    }

    return (

      <div className="row element-form-row">
        <div className="col-sm-4">
          <label>{field.name}
            {isRequired &&
              <span className="required">&nbsp; *</span>
            }
          </label>
        </div>
        <div className="col-sm-6">
          <input type="number" name={field.identifier}
            className={"form-control " + errors}
            value={this.props.value}
            max={this.getNumberFromRules('maxNumber')}
            min={this.getNumberFromRules('minNumber')}
            onChange={this.handleOnChange.bind(this)}
            placeholder={this.getPlaceholder()}
          />
        </div>
      </div>
    );
  }

}

export default NumberField;
