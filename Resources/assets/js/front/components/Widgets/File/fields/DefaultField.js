import React, {Component} from 'react';
import { render } from 'react-dom';


class DefaultField extends Component
{
  constructor(props)
  {
    super(props);
   
  }

  getConditionalFormating() {

    let {field,value} = this.props;
    value = typeof value === 'string' ? value.toLowerCase() : value;
    

    if(field.settings.conditionalFormatting !== undefined && 
      field.settings.conditionalFormatting != null) {
      
      for(var key in field.settings.conditionalFormatting.conditions){
        var condition = field.settings.conditionalFormatting.conditions[key];
        var conditionValue = condition.value === 'string' ? 
          condition.value.toLowerCase() : condition.value;

        if(value.indexOf(conditionValue) != -1) {
          //if the string is contained in the string
          return {
            color : condition.color,
            backgroundColor : condition.backgroundColor,
          };
        }
      }
    }

    return {};
  }

  hasConditionalFormatting(conditionalFormatting) {
    if(conditionalFormatting.color !== undefined){
      return true;
    }
    return false;
  }

  render() {

    const {field,name,value} = this.props;

    var conditionalFormatting = this.getConditionalFormating();
    var hasColor = this.hasConditionalFormatting(conditionalFormatting);

    return (
      <div className="element-file-input-container">
          <div className="col-xs-6 col-md-4 element-file-title">
            {name}
          </div>

          <div className={"col-xs-6 col-md-8 element-file-content " +(hasColor ? 'has-color' : '')}>
            <div className="value-container" style={conditionalFormatting}>
              <div className="value-content" dangerouslySetInnerHTML={{__html: value}}>
              </div>
            </div>
          </div>
        </div>
    );
  }

}

export default DefaultField;
