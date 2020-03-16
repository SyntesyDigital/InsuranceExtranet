import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColContainer from './ColContainer';

export default class ColField extends Component {

    constructor(props) {
        super(props);
    }

    // ==============================
    // Handlers
    // ==============================

    handleUp(e) {
        e.preventDefault();
        this.props.onUp();
    }

    handleDown(e){
        e.preventDefault();
        this.props.onDown();
    }

    handleRemove(e) {
        e.preventDefault();
        this.props.onRemove();
    }

    // ==============================
    // Renderers
    // ==============================

    render() {
        return (
            <div className="page-row filled">
                <div className="row-container row-container-component">
                    <div className="row-container-header">

                        <div className="left-buttons">
                            <a href="#" className="btn btn-link" onClick={this.handleUp.bind(this)}>
                                <i className="fa fa-arrow-up"></i>
                            </a>
                            <a href="#" className="btn btn-link" onClick={this.handleDown.bind(this)}>
                                <i className="fa fa-arrow-down"></i>
                            </a>
                        </div>
                        <div className="right-buttons">
                            <a href="#" className="btn btn-link text-danger" onClick={this.handleRemove.bind(this)}>
                                <i className="fas fa-trash-alt"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-container">
                        <span><p>{this.props.label}</p></span>
                    </div>
                </div>
            </div>
        );
    }
}

ColField.propTypes = {

    label: PropTypes.string.isRequired,

    onUp: PropTypes.func,
    onDown: PropTypes.func,
    onRemove: PropTypes.func,

};
