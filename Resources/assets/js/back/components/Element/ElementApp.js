import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/index";
import { connect } from 'react-redux'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ElementForm from './ElementForm';
import configureStore from './configureStore'

let store = configureStore();

const theme = createMuiTheme({
    typography: {
        fontSize: 20,
    },
});

if (document.getElementById('element-form')) {
    var htmlElement = document.getElementById('element-form');

    ReactDOM.render(
      <Provider store={store}>
          <ThemeProvider theme={theme}>
                <ElementForm
                    element={htmlElement.getAttribute('element')}
                    fields={htmlElement.getAttribute('fields')}
                    parametersList={htmlElement.getAttribute('parametersList')}
                    parameters={htmlElement.getAttribute('parameters')}
                    model={htmlElement.getAttribute('model')}
                    wsModelIdentifier={htmlElement.getAttribute('wsModelIdentifier')}
                    wsModel={htmlElement.getAttribute('wsModel')}
                    wsModelFormat={htmlElement.getAttribute('wsModelFormat')}
                    wsModelExemple={htmlElement.getAttribute('wsModelExemple')}
                    elementType={htmlElement.getAttribute('elementType')}
                    procedures={htmlElement.getAttribute('procedures')}
                    variables={htmlElement.getAttribute('variables')}
                    tabsRoutes={htmlElement.getAttribute('tabsRoutes')}
                />
        </ThemeProvider>
      </Provider>
    , htmlElement);
}
