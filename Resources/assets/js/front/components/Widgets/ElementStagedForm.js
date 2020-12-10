import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FormComponent from './Forms/Form/FormComponent';

import {
  getParametersFromContentField
} from './Forms/functions';

export default class ElementStagedForm extends Component {

    constructor(props){
        super(props);

        //console.log("props.field",props.field);
        var template = props.field.settings.template ? props.field.settings.template : null;

        var stageParameter = props.field.settings.stageParameter ? props.field.settings.stageParameter : null
        var initStage = props.field.settings.initStage ? props.field.settings.initStage : 1;

        this.state = {
          field : props.field,
          template : template,
          stageParameter : stageParameter,
          initStage : initStage
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
            finalRedirectParameters={this.props.finalRedirectParameters ? this.props.finalRedirectParameters : []}
            template={this.state.template}
            hasStages={true} 
            stageParameter={this.state.stageParameter}
            initStage={this.state.initStage}
          />
        );
    }
}

if (document.getElementById('element-staged-form')) {

   document.querySelectorAll('[id=element-staged-form]').forEach(function(element){
       var field = JSON.parse(atob(element.getAttribute('field')));
       var elementObject = JSON.parse(atob(element.getAttribute('elementObject')));
       var parameters = element.getAttribute('parameters');
       var finalRedirectUrl = "";
       var finalRedirectParameters = [];

       if(field.fields[0].value !== undefined && field.fields[0].value != null &&
         field.fields[0].value.content !== undefined &&
         field.fields[0].value.content.url !== undefined){
           finalRedirectUrl = field.fields[0].value.content.url;

           //get parameters form url
          finalRedirectParameters = getParametersFromContentField(field.fields[0].value.content)
       }

       ReactDOM.render(<ElementStagedForm
           field={field}
           elementObject={elementObject}
           parameters={parameters}
           finalRedirectUrl={finalRedirectUrl}
           finalRedirectParameters={finalRedirectParameters}
         />, element);
   });
}
