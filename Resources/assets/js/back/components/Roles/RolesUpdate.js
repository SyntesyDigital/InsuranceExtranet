
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RolesUpdateRedux from './RolesUpdateRedux';

import { Provider } from "react-redux";

import configureStore from './configureStore'

let store = configureStore();

export default class RolesUpdate extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Provider store={store}>
                <RolesUpdateRedux />
            </Provider>
        );
    }


}

if (document.getElementById('roles-update')) {
    ReactDOM.render(<RolesUpdate />, document.getElementById('roles-update'));
}


