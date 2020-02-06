import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import UserUpdateRedux from "./UserUpdateRedux";
import configureStore from './configureStore'

let store = configureStore();

export default class UserUpdate extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Provider store={store}>
          <UserUpdateRedux 
            userId={this.props.userId}
          />
      </Provider>
    );
  }
}

if (document.getElementById('user-update')) {

  var element = document.getElementById('user-update');

  ReactDOM.render(<UserUpdate
    userId={element.getAttribute('userId')}
  />, document.getElementById('user-update'));
}
