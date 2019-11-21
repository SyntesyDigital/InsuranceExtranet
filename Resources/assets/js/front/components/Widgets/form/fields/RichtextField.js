import React, {Component} from 'react';
import { render } from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class RichtextField extends Component
{
  constructor(props)
  {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }


  handleOnChange(event)
  {
    this.props.onFieldChange({
      name : this.props.field.identifier,
      value : event.target.value
    });

  }

  render() {

    const {field} = this.props;
    const isRequired = field.rules.required !== undefined ?
      field.rules.required : false;
    const errors = this.props.error ? 'is-invalid' : '';

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
          <ReactQuill
             id={field.identifier}
             className={"form-control " + errors}
             parent={this}
             value={this.props.value}
             onChange={this.handleOnChange}
           />
        </div>
      </div>
    );
  }

}

export default RichtextField;
