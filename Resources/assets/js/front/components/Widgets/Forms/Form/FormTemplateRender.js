import React, { Component } from 'react';

import {
  getFieldComponent,
  parameteres2Array,
  isVisible,
  getUrlParameters,
} from '../functions';


class FormTemplateRender extends Component {

    constructor(props)
    {
        super(props);

        var parametersObject = parameteres2Array(props.parametersObject);

        //if parent parameters defined update
        parametersObject = this.updateFormParentParemeters(props.parentFormParameters,parametersObject);

        this.state = {
            elementObject : props.elementObject,
            values : this.initValues(props.elementObject),
            errors : {},
            parameters : parametersObject,
            template : props.template ? props.template : null,
            templateLoaded : props.template ? false : true
        };

        this.props.initParametersState(parametersObject);

        this.handleOnChange = this.handleOnChange.bind(this);

        this.props.loadProcedures(props.elementObject.model_identifier);
    }

    
    renderItems() {

      if(this.state.elementObject.fields === undefined || this.state.elementObject.fields == null){
        return null;
      }

      var fields = [];

      for(var key in this.state.elementObject.fields) {
        var field = this.state.elementObject.fields[key];
        
        const FieldComponent = getFieldComponent(field.type);

        //check visibilitiy
        const visible = isVisible(field,this.props.parameters.formParameters,this.state.values);

        ////console.log("is visible ==> "+field.name,field,visible);

        if(visible){
          var fieldComponent = <FieldComponent
            key={key}
            field={field}
            value={this.state.values[field.identifier]}
            error={this.state.errors[field.identifier] !== undefined ? true : false}
            onFieldChange={this.handleOnChange}
            parameters={getUrlParameters(
              this.props.parameters.formParameters
            )}
            values={this.state.values}
            inline={this.props.isFormPreload}
          />;
          
            if(this.props.isFormPreload){
              fieldComponent = 
                <div className="col-xs-12 col-md-4">
                  {fieldComponent}
                </div>;
            }

            fields.push(fieldComponent);
         }

      }

      return fields;

    }

    

    render() {

        const loaded = this.props.preload.done;
        const version = this.props.version;

        return (
          <div className={"form-component element-form-wrapper row "+(this.props.form.loading == true ? 'loading' : '')}>
            
            <FormPreload 
              onPreloadDone={this.handlePreload.bind(this)}
              version={this.props.version}
            />

            <FormParametersIterator />
            <FormProceduresIterator
              values={this.state.values}
              onFinish={this.handleFinish.bind(this)}
              version={this.props.version}
            />

            {
              !loaded &&
              <div className="" style={{
                padding:40,
                textAlign : 'center'
              }}>
                En cours de chargement
              </div>
            }
            {loaded &&
                <form id={this.props.id} onSubmit={this.handleSubmit.bind(this,this.props.id)} >

                  {this.renderItems()}

                  <div className={"element-form-row "+(this.props.isFormPreload ? '' : 'row')}>

                    {!this.props.isFormPreload && 
                       <div className="col-md-4"></div>
                    }

                    <div className="col-md-6 buttons">
                        <button
                          className={"btn "+(!this.props.isFormPreload ? "right btn-primary" : "btn-secondary")}
                          type="submit"
                          disabled={this.props.form.processing}
                        >
                          <i className={(!this.props.isFormPreload ? "fa fa-paper-plane" : "fas fa-redo-alt")}></i>

                        {(!this.props.isFormPreload ? "Valider" : "Précharger")}
                        </button>
                        {/*
                        <a className="btn btn-back left"><i className="fa fa-angle-left"></i> Retour</a>
                        */}
                    </div>
                  </div>

                </form>
            }
          </div>
        );
    }
}
export default FormTemplateRender;
