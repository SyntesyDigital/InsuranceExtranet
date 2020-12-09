import React, {Component} from 'react';
import LabelTooltip from '../../../Common/LabelTooltip';
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

  fieldHasPlaceholderSettings() {
    return this.props.field.settings.placeholder !== undefined && this.props.field.settings.placeholder !== null ? true : false;
  }

  getPlaceholder() {
      if (this.fieldHasPlaceholderSettings()) {
          return this.props.field.settings.placeholder !== '' ? this.props.field.settings.placeholder : '';
      }
      return '';
  }

  render() {

    const {field} = this.props;

    const isRequired = field.rules.required !== undefined ?
      field.rules.required : false;

    let hasDescription = this.props.field.settings.description !== undefined ?
    this.props.field.settings.description : false;

    const errors = this.props.error ? ' has-error' : '';

    let textFieldClass = ["text-field"];
    if (this.state.addClassBordered || this.props.value != "") {
        textFieldClass.push('bordered');
    }

    var maxCharacters = this.getNumberFromRules('maxCharacters');
    var minCharacters = this.getNumberFromRules('minCharacters');

    var placeholder = this.getPlaceholder();

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
                  {hasDescription && 
                      <LabelTooltip 
                          description={this.props.field.settings.description ? 
                              this.props.field.settings.description : ''}
                      />
                  }
              </label>
            }
            &nbsp;
                {maxCharacters != "" && 
                  ('( Max: '+maxCharacters+' caractères )')
                }
          </div>
          <div className={colClassInput}>
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
              placeholder={placeholder != '' ? placeholder : ""}

            ></textarea>
            </div>
          </div>
      </div>
    );
  }

}

export default RichtextField;
