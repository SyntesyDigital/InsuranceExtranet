
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RolesUpdateRedux from './RolesUpdateRedux';

import { Provider } from "react-redux";

import configureStore from './configureStore'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

let store = configureStore();

//necessary because material ui is using rem. 
const theme = createMuiTheme({
    typography: {
      fontSize: 18,
    },
  });

export default class RolesUpdate extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <RolesUpdateRedux 
                        roleId={this.props.roleId}
                    />
                </ThemeProvider>
            </Provider>
        );
    }


}

if (document.getElementById('roles-update')) {

    var element = document.getElementById('roles-update');

    ReactDOM.render(<RolesUpdate 
        roleId={element.getAttribute('roleId')}
    />, document.getElementById('roles-update'));
}


