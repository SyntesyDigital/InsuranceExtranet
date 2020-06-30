import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FormButton from './Forms/Form/FormButton/FormButton';

export default class ElementForm extends Component {

    constructor(props)
    {
        super(props);
    }

    handleFormFinished() {
      //TODO do something when form finish
    }

    render() {

        return (
          <FormButton
            field={this.props.field}
            elementObject={this.props.elementObject}
            parameters={this.props.parameters}
            finalRedirectUrl={this.props.finalRedirectUrl}
            onFormFinished={this.handleFormFinished.bind(this)}
          />
        );
    }
}

if (document.getElementById('element-form-button')) {

   document.querySelectorAll('[id=element-form-button]').forEach(function(element){
       var field = JSON.parse(atob(element.getAttribute('field')));
       var elementObject = JSON.parse(atob(element.getAttribute('elementObject')));
       var parameters = element.getAttribute('parameters');
       var finalRedirectUrl = "";

       if(field.fields[1].value !== undefined && field.fields[1].value != null &&
         field.fields[1].value.content !== undefined &&
         field.fields[1].value.content.url !== undefined){
           finalRedirectUrl = field.fields[1].value.content.url;
       }

       ReactDOM.render(<ElementForm
           field={field}
           elementObject={elementObject}
           parameters={parameters}
           finalRedirectUrl={finalRedirectUrl}
         />, element);
   });
}
