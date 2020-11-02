import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FormRedux from './FormRedux';

import { Provider } from "react-redux";

import configureStore from './configureStore'



export default class FormComponent extends Component {

    constructor(props)
    {
        super(props);
        this.store = configureStore();
    }

    render() {
        return (
          <Provider store={this.props.store ? this.props.store : this.store}>
            <FormRedux
              id={this.props.id ? this.props.id : 'form'}
              elementObject={this.props.elementObject}
              parametersObject={this.props.parameters}
              finalRedirectUrl={this.props.finalRedirectUrl}
              finalRedirectParameters={this.props.finalRedirectParameters ? this.props.finalRedirectParameters : []}
              onFormFinished={this.props.onFormFinished}
              version={this.props.version}
              isFormPreload={this.props.isFormPreload}
              parentFormParameters={this.props.parentFormParameters ? 
                this.props.parentFormParameters : null}
              preloadUpdate={this.props.preloadUpdate ? 
                this.props.preloadUpdate : false}
              onPreloadUpdated={this.props.onPreloadUpdated}
              template={this.props.template ? this.props.template : null}
              hasStages={this.props.hasStages ? this.props.hasStages : false} 
              stageParameter={this.props.stageParameter ? this.props.stageParameter : null}
              initStage={this.props.initStage ? this.props.initStage : 1}
            />
          </Provider>
        );
    }
}
