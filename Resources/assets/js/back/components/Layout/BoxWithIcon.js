import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class BoxWithIcon extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
          <div className="col-xs-3">
            <a href="">
              <div className="grid-item">
                <div className="grid-item-content">
                  <i className={this.props.icon}></i>
                  <p className="grid-item-name">
                      {this.props.name}
                  </p>
                </div>
              </div>
            </a>
          </div>
        );
    }
}

BoxWithIcon.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};
