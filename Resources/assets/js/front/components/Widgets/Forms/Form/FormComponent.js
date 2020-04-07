import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FormRedux from './FormRedux';

import { Provider } from "react-redux";

import configureStore from './configureStore'

let store = configureStore();

export default class FormComponent extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
          <Provider store={this.props.store ? this.props.store : store}>
            <FormRedux
              id={this.props.id ? this.props.id : 'form'}
              elementObject={this.props.elementObject}
              parametersObject={this.props.parameters}
              finalRedirectUrl={this.props.finalRedirectUrl}
              onFormFinished={this.props.onFormFinished}
              version={this.props.version}
              isFormPreload={this.props.isFormPreload}
              parentFormParameters={this.props.parentFormParameters ? 
                this.props.parentFormParameters : null}
              preloadUpdate={this.props.preloadUpdate ? 
                this.props.preloadUpdate : false}
              onPreloadUpdated={this.props.onPreloadUpdated}
              template={this.props.template ? this.props.template : null}
            />
          </Provider>
        );
    }
}
