import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BoxList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { subtitle } = this.props;
    return (
      <div>
        <label>{subtitle}</label>
        <div className="grid-items">
          <div className="row">
            {this.props.children}
          </div>
        </div>
      </div>

    );
  }
}

BoxList.propTypes = {
  subtitle: PropTypes.string,
};
