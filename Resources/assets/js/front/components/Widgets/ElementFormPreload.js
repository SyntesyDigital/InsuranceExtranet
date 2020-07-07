import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FormComponent from './Forms/Form/FormComponent';

import configureStore from './Forms/Form/configureStore';

let store1 = configureStore();
let store2 = configureStore();

import {
  getParametersFromContentField
} from './Forms/functions';

export default class ElementFormPreload extends Component {

    constructor(props)
    {
        super(props);

        var template = props.field.settings.template ? props.field.settings.template : null;

        this.state = {
          preloaded : false,
          formPreloadEnabled : true,
          formEnabled : false,
          preloadParameters : {},
          formPreloadUpdate : false,
          template : template
        };
    }

    handleFormFinished() {
      //TODO do something when form finish
      
    }

    handlePreloadUpdate() {
      this.setState({
        formPreloadUpdate : false
      });
    }

    handlePreload(formParameters) {
      //process preload form parameters
      console.log("handlePreload :: Preload Form finished! (formParameters)",formParameters);
      this.setState({
        preloadParameters : formParameters,
        formPreloadUpdate : true
      });
    }

    render() {

        return (
          <div>
            <FormComponent
              //field={this.props.field}
              id="preload-form"
              elementObject={this.props.elementPreloadObject}
              parameters={this.props.parameters}
              finalRedirectUrl={''}
              onFormFinished={this.handlePreload.bind(this)}
              version={"2"}
              store={store1}
              isFormPreload={true}
            />

            <hr/>

            <FormComponent
              //field={this.props.field}
              id="form"
              elementObject={this.props.elementObject}
              parameters={this.props.parameters}
              finalRedirectUrl={this.props.finalRedirectUrl}
              finalRedirectParameters={this.props.finalRedirectParameters ? this.props.finalRedirectParameters : []}
              onFormFinished={this.handleFormFinished.bind(this)}
              version={"2"}
              store={store2}
              parentFormParameters={this.state.preloadParameters}
              preloadUpdate={this.state.formPreloadUpdate}
              onPreloadUpdated={this.handlePreloadUpdate.bind(this)}
              template={this.state.template}
            />
          </div>
        );
    }
}

if (document.getElementById('element-form-preload')) {

   document.querySelectorAll('[id=element-form-preload]').forEach(function(element){
       var field = JSON.parse(atob(element.getAttribute('field')));
       var elementObject = JSON.parse(atob(element.getAttribute('elementObject')));
       var elementPreloadObject = JSON.parse(atob(element.getAttribute('elementPreloadObject')));

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

       ReactDOM.render(<ElementFormPreload
           field={field}
           elementObject={elementObject}
           elementPreloadObject={elementPreloadObject}
           parameters={parameters}
           finalRedirectUrl={finalRedirectUrl}
           finalRedirectParameters={finalRedirectParameters}
         />, element);
   });
}
