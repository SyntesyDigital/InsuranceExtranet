import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import FormsUpdateRedux from "./FormsUpdateRedux";
import configureStore from './configureStore'

let store = configureStore();

export default class FormsUpdate extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Provider store={store}>
          <FormsUpdateRedux />
      </Provider>
    );
  }
}

if (document.getElementById('elements-models-forms-update')) {
  ReactDOM.render(<FormsUpdate />, document.getElementById('elements-models-forms-update'));
}
