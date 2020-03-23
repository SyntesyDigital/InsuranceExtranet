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
          <Provider store={store}>
            <FormRedux
              elementObject={this.props.elementObject}
              parametersObject={this.props.parameters}
              finalRedirectUrl={this.props.finalRedirectUrl}
              onFormFinished={this.props.onFormFinished}
              version={this.props.version}
            />
          </Provider>
        );
    }
}
