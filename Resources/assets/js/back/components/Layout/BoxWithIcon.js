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
          <div class="col-xs-3">
            <a href="">
              <div class="grid-item">
                <div class="grid-item-content">
                  <i class={this.props.icon}></i>
                  <p class="grid-item-name">
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
