import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DragField extends Component {
    render() {
        return (
            <div className="field-list">
                <div className="field">
                    <i className={this.props.icon}></i> &nbsp;
                        {this.props.label} &nbsp;
                    </div>
            </div>
        )
    }
}

DragField.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};
