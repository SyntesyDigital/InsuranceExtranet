import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class BoxInputAdd extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
          <div className="box-input-add" onClick={this.props.onClick}>
            <a href="#" className="add-element">
              <i className="fa fa-plus"></i> &nbsp;
              {this.props.label}
            </a>
          </div>
        );
    }
}

BoxInputAdd.propTypes = {
  label: PropTypes.string,
  onClick : PropTypes.func
};
