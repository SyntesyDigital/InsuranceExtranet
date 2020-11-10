import React, { Component } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import PropTypes from 'prop-types';

const overrideSpinner = css`
  display: block;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

export default class Spinner extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="spinner-loading">
                <ClipLoader
                    size={this.props.size}
                    color={this.props.color}
                    loading={this.props.loading}
                    css={overrideSpinner}
                    class
                />
            </div>
        );
    }
}

Spinner.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    loading: PropTypes.bool,
};
