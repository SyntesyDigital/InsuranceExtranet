import React, {Component} from 'react'

import { Provider } from "react-redux";
import configureStore from './configureStore';
import PageBuilderRedux from './Page/PageBuilderRedux';

export default class PageBuilder extends Component {

    constructor(props) {
      super(props);
      this.store = configureStore();
    }

    render() {

      return (
        <Provider store={this.store}>
          <PageBuilderRedux 
            pages={this.props.pages}
            tags={this.props.tags}
            categories={this.props.categories}
            fields={this.props.fields}
            initLayout={this.props.initLayout}
            users={this.props.users}
            enableWidgets={this.props.enableWidgets}
            nonAllowedFields={this.props.nonAllowedFields}
            onChange={this.props.onChange}
          />
        </Provider>
      );
    }
}
