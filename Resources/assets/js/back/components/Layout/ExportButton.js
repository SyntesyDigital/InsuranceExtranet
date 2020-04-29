import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExportButton extends Component {

    constructor(props) {
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

if (document.getElementById('export-button')) {
    ReactDOM.render(<ExportButton />, document.getElementById('export-button'));
}

ExportButton.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    route: PropTypes.string
};
