import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default  class SidebarTitle extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        const {title} = this.props;
        return (
          <label className="bmd-label-floating">{title}</label>
        );
    }
}

SidebarTitle.propTypes = {
    title: PropTypes.string,
};
