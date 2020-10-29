import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from '../configureStore';
import SubmitTriggerRedux from './FormSubmitTriggerRedux';

export default class FormSubmitTrigger extends Component {

    constructor(props)
    {
        super(props);
        this.store = configureStore();
    }

    render() {
        return (
          <Provider store={this.store}>
            <SubmitTriggerRedux
              elementObject={this.props.elementObject}
              parametersObject={this.props.parameters}
              onFormFinished={this.props.onFormFinished}
            />
          </Provider>
        );
    }
}
