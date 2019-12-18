import React, {Component} from 'react';
import { render } from 'react-dom';

class TextField extends Component
{
  constructor(props)
  {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);

  }


  handleOnChange(event)
  {

    this.props.onFieldChange({
      name : event.target.name,
      value : event.target.value
    });

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
          <input
            type="text"
            name={field.identifier}
            className={"form-control " + errors}
            value={this.props.value}
            onChange={this.handleOnChange.bind(this)}

          />
        </div>
      </div>
    );
  }

}

export default TextField;
