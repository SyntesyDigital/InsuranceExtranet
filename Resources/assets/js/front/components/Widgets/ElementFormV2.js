import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FormComponent from './Forms/Form/FormComponent';

export default class ElementForm extends Component {

    constructor(props){
        super(props);

        //console.log("props.field",props.field);
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
            onFormFinished={this.handleFormFinished.bind(this)}
            version={"2"}
            template={this.state.template}
          />
        );
    }
}

if (document.getElementById('element-form-v2')) {

   document.querySelectorAll('[id=element-form-v2]').forEach(function(element){
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
