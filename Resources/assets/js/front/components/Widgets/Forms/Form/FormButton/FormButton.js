import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";

import configureStore from './../configureStore';

import FormButtonRedux from './FormButtonRedux';

let store = configureStore();

export default class FormButton extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
          <Provider store={store}>
            <FormButtonRedux
              field={this.props.field}
              elementObject={this.props.elementObject}
              parametersObject={this.props.parameters}
            />
          </Provider>
        );
    }
}
