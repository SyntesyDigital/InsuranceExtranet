import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from './configureStore';
import TemplateRedux from './TemplateRedux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        fontSize: 20,
    },
});


export default class Template extends Component {

    constructor(props) {
        super(props);
        this.store = configureStore();
    }

    render() {
        return (
            <Provider store={this.store}>
                <ThemeProvider theme={theme}>
                    <TemplateRedux
                        elementId={this.props.elementId}
                        templateId={this.props.templateId}
                        fields={this.props.fields}
                        templates={this.props.templates}
                        tabsRoutes={this.props.tabsRoutes}
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
            elementId={element.getAttribute('elementId')}
            templateId={element.getAttribute('templateId')}
            fields={element.getAttribute('fields')}
            templates={element.getAttribute('templates')}
            tabsRoutes={element.getAttribute('tabsRoutes')}
        />,document.getElementById('elements-template')
    );
}
