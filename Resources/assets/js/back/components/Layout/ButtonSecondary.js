import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class ButtonSecondary extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
          <a href={this.props.route} className="btn btn-default" onClick={this.props.onClick}>
            <i className={this.props.icon}></i>
            &nbsp;&nbsp;
            {this.props.label}
          </a>
        );
    }
}

ButtonSecondary.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick : PropTypes.func,
  route : PropTypes.string
};
