import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BoxAdd extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-xs-3 dashed">
        <a href="#" className="add-element">
          <div className="grid-item">
            <div className="grid-item-content">
              <i className="fa fa-plus"></i>
              <p className="grid-item-name">
                {this.props.label}
              </p>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

BoxAdd.propTypes = {
  label: PropTypes.string.isRequired,
};
