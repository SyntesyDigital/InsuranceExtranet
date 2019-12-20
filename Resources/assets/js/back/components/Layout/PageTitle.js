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
            <h3 className="card-title" style={{
              display: 'inline-block',
              verticalAlign: 'top',
              paddingRight: 20,
              marginTop: 14,
              marginBottom: 14,
            }}>
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
