import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class BoxList extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
          <div className="grid-items">
            <div className="row">
              {this.props.children}
            </div>
          </div>
        );
    }
}

BoxList.propTypes = {
};
