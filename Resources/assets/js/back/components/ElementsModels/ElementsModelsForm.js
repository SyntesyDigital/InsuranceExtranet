import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import ElementsModelsFormRedux from "./ElementsModelsFormRedux";
import configureStore from './configureStore'

let store = configureStore();

export default class ElementsModelsForm extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Provider store={store}>
          <ElementsModelsFormRedux 
            modelId={this.props.modelId}
            type={this.props.type}
          />
      </Provider>
    );
  }
}

if (document.getElementById('elements-models-forms-update')) {

  var element = document.getElementById('elements-models-forms-update');

  ReactDOM.render(<ElementsModelsForm 
      modelId={element.getAttribute('modelId')}
      type={element.getAttribute('type')}
  />, document.getElementById('elements-models-forms-update'));
}
