import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class IframeFile extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <div className="iframe-file">
                <iframe src="http://www.orimi.com/pdf-test.pdf" width="100%" height="500"></iframe>
            </div>
        );
    }
}

IframeFile.propTypes = {
    link: PropTypes.string
};




