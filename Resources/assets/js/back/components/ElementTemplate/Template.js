import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from './configureStore';
import TemplateRedux from './TemplateRedux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

let store = configureStore();

const theme = createMuiTheme({
    typography: {
        fontSize: 20,
    },
});


export default class Template extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <TemplateRedux
                        templateId={this.props.templateId}
                    />
                </ThemeProvider>
            </Provider>
        );
    }
}

if (document.getElementById('elements-template')) {
    var element = document.getElementById('elements-template');
    ReactDOM.render(
        <Template
            templateId={element.getAttribute('templateId')}
        />,document.getElementById('elements-template')
    );
}
