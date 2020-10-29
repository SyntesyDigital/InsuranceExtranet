import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FormSubmitTrigger from './Forms/Form/FormSubmitTrigger/FormSubmitTrigger';

import {
    getParametersFromContentField
} from './Forms/functions';

export default class ElementFormTrigger extends Component {

    constructor(props)
    {
        super(props);
    }

    handleFormFinished(params) {
      //TODO do something when form finish
      
    }

    render() {
        return (
          <FormSubmitTrigger
            elementObject={this.props.elementObject}
            parameters={this.props.parameters}
            onFormFinished={this.handleFormFinished.bind(this)}
          />
        );
    }
}

if (document.getElementById('element-form-trigger')) {
   document.querySelectorAll('[id=element-form-trigger]').forEach(function(element){
       var elementObject = JSON.parse(atob(element.getAttribute('elementObject')));
       var parameters = element.getAttribute('parameters');

       ReactDOM.render(<ElementFormTrigger
           elementObject={elementObject}
           parameters={parameters}
         />, element);
   });
}
