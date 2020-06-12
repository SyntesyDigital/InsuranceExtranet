import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";

import configureStore from './../configureStore';

import FormButtonRedux from './FormButtonRedux';

export default class FormButton extends Component {

    constructor(props)
    {
        super(props);
        this.store = configureStore();
    }

    render() {
        return (
          <Provider store={this.store}>
            <FormButtonRedux
              field={this.props.field}
              elementObject={this.props.elementObject}
              parametersObject={this.props.parameters}
              finalRedirectUrl={this.props.finalRedirectUrl}
              onFormFinished={this.props.onFormFinished}
            />
          </Provider>
        );
    }
}
