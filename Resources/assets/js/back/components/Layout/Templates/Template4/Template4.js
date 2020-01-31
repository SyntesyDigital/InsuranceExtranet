import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import TemplateRedux from "./TemplateRedux";

import configureStore from './configureStore'

let store = configureStore();

export default class Template4 extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Provider store={store}>
          <TemplateRedux />
      </Provider>
    );
  }
}

if (document.getElementById('template-4')) {
  ReactDOM.render(<Template4 />, document.getElementById('template-4'));
}
