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
          <FormsUpdateRedux 
            modelId={this.props.modelId}
          />
      </Provider>
    );
  }
}

if (document.getElementById('elements-models-forms-update')) {

  var element = document.getElementById('elements-models-forms-update');

  ReactDOM.render(<FormsUpdate 
      modelId={element.getAttribute('modelId')}
  />, document.getElementById('elements-models-forms-update'));
}
