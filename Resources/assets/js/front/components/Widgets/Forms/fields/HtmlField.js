import React, {Component} from 'react';
import { render } from 'react-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class HtmlField extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      addClassBordered: false,
    }
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

  handleOnChange(content, delta, source, editor)
  {
    this.props.onFieldChange({
      name : this.props.field.identifier,
      value : content
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


    let textFieldClass = ["text-field"];
    if (this.state.addClassBordered || this.props.value != "") {
        textFieldClass.push('bordered');
    }

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

      <div className={"form-group bmd-form-group" + (errors)}>
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
            <ReactQuill
                id={field.identifier}
                className={"" + errors}
                formats={formats}
                height={200}
                parent={this}
                value={this.props.value}
                onChange={this.handleOnChange.bind(this)}
                modules={modules}
              />
          </div>
        </div>
      </div>
    );
  }

}

export default HtmlField;
