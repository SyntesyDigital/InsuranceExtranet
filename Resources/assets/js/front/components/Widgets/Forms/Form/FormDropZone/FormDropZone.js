import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";

import configureStore from './../configureStore';

import FormDropZoneRedux from './FormDropZoneRedux';


export default class FormDropZone extends Component {

    constructor(props)
    {
        super(props);

        this.store = configureStore();
    }

    render() {
        return (
          <Provider store={this.store}>
            <FormDropZoneRedux
              label={this.props.label}
              field={this.props.field}
              elementObject={this.props.elementObject}
              parametersObject={this.props.parametersObject}
              modelId={this.props.modelId}
              onFormFinished={this.props.onFormFinished}
              id={this.props.id}
            />
          </Provider>
        );
    }
}
