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


  /*
  handleOnChange(content, delta, source, editor)
  {
    this.props.onFieldChange({
      name : this.props.field.identifier,
      value : content
    });

  }
  */
  handleOnChange(event) {

    this.props.onFieldChange({
      name : event.target.name,
      value : event.target.value
    });

  }

  render() {

    const {field} = this.props;
    const isRequired = field.rules.required !== undefined ?
      field.rules.required : false;
    const errors = this.props.error ? 'is-invalid' : '';

    var modules = {
      toolbar: [
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['link']
      ],
     };
 
      var formats = [
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'indent',
        'link'
      ];

    return (

      <div className="row element-form-row richttext-field">
        <div className="col-sm-4">
          <label>{field.name}
          {isRequired &&
            <span className="required">&nbsp; *</span>
          }
          </label>
        </div>
        <div className="col-sm-6">
          <textarea
            id={field.identifier}
            name={field.identifier}
            className={"form-control " + errors}
            value={this.props.value}
            onChange={this.handleOnChange}
            rows={4}
          ></textarea>
          {/*
          <ReactQuill
             id={field.identifier}
             className={"" + errors}
             parent={this}
             value={this.props.value}
             onChange={this.handleOnChange}
             modules={modules}
             formats={formats}
             height={200}
           />
          */}
        </div>
      </div>
    );
  }

}

export default RichtextField;
