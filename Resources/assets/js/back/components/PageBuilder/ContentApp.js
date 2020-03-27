import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/index";
import { connect } from 'react-redux'

import ContentForm from './ContentForm';

import configureStore from './configureStore'

let store = configureStore();

if (document.getElementById('content-form')) {
    var element = document.getElementById('content-form');
    var typology = element.getAttribute('typology');
    var users = element.getAttribute('users');
    var content = element.getAttribute('content');
    var fields = element.getAttribute('fields');
    var tags = element.getAttribute('tags');
    var page = element.getAttribute('page');
    var pages = element.getAttribute('pages');
    var categories = element.getAttribute('categories');
    var settings = element.getAttribute('settings');

    ReactDOM.render(
      <Provider store={store}>
        <ContentForm
          settings={settings}
          page={page}
          pages={pages}
          tags={tags}
          categories={categories}
          fields={fields}
          typology={typology}
          content={content}
          users={users}
        />
      </Provider>
    , element);
}
