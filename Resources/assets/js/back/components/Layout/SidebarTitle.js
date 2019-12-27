import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default  class SidebarTitle extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
          <label className="bmd-label-floating">
            CHECKBOX GROUP
          </label>
        );
    }
}

SidebarTitle.propTypes = {
};
