import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default  class PageTitle extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
          <div>
            <h3 className="card-title">
              <i className={this.props.icon}></i> &nbsp;
              {this.props.title}
            </h3>
            {this.props.children}
          </div>
        );
    }
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};
