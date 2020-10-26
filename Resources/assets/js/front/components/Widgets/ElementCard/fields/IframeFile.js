import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class IframeFile extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="iframe-file">
                <iframe className="iframe-content" src={this.props.link} width="100%"></iframe>
            </div>
        );
    }
}

IframeFile.propTypes = {
    link: PropTypes.string
};




