import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FormComponent from './Forms/Form/FormComponent';

import {
  getParametersFromContentField
} from './Forms/functions';

export default class ElementForm extends Component {

    constructor(props)
    {
        super(props);

        var template = props.field.settings.template ? props.field.settings.template : null;

        this.state = {
          field : props.field,
          template : template
        }
    }

    handleFormFinished() {
      //TODO do something when form finish
    }

    render() {

        return (
          <FormComponent
            //field={this.props.field}
            elementObject={this.props.elementObject}
            parameters={this.props.parameters}
            finalRedirectUrl={this.props.finalRedirectUrl}
            finalRedirectParameters={this.props.finalRedirectParameters ? this.props.finalRedirectParameters : []}
            onFormFinished={this.handleFormFinished.bind(this)}
            version={"1"}
            template={this.state.template}
          />
        );
    }
}

if (document.getElementById('elementForm')) {

   document.querySelectorAll('[id=elementForm]').forEach(function(element){
       var field = JSON.parse(atob(element.getAttribute('field')));
       var elementObject = JSON.parse(atob(element.getAttribute('elementObject')));
       var parameters = element.getAttribute('parameters');
       var finalRedirectUrl = "";
       var finalRedirectParameters = [];

       if(field.fields[1].value !== undefined && field.fields[1].value != null &&
         field.fields[1].value.content !== undefined &&
         field.fields[1].value.content.url !== undefined){
           finalRedirectUrl = field.fields[1].value.content.url;

          //get parameters form url
          finalRedirectParameters = getParametersFromContentField(field.fields[1].value.content)
       }

       ReactDOM.render(<ElementForm
           field={field}
           elementObject={elementObject}
           parameters={parameters}
           finalRedirectUrl={finalRedirectUrl}
           finalRedirectParameters={finalRedirectParameters}
         />, element);
   });
}
