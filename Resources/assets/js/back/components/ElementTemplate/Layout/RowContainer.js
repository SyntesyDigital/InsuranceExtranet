import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RowContainer extends Component {

    constructor(props) {
        super(props);
    }

    // ==============================
    // Handlers
    // ==============================

    handleEdit(e) {
        e.preventDefault();
        this.props.onEdit();
    }

    handleUp(e) {
        e.preventDefault();
        this.props.onUp();
    }

    handleColumns(e) {
        e.preventDefault();
        console.log('handleColumns :: ')
    }

    handleDown(e){
        e.preventDefault();
        this.props.onDown();
    }

    handleDuplicate(e){
        e.preventDefault();
        this.props.onDuplicate();
    }
    
    handleRemove(e){
        e.preventDefault();
        this.props.onRemove();
    }

    // ==============================
    // Renderers
    // ==============================

    render() {
        const { duplicateButton, removeButton, columnsButton, editButton } = this.props;

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

                            {columnsButton ?
                                <a href="#" className="btn btn-link" onClick={this.handleColumns.bind(this)}>
                                    <i className="fa fa-columns"></i>
                                </a>
                                : null}
                        </div>
                        <div className="right-buttons">
                            {editButton ?
                                <a href="#" className="btn btn-link" onClick={this.handleEdit.bind(this)}>
                                    <i className="fa fa-pencil-alt"></i>
                                </a>
                                : null}
                            {duplicateButton ?
                                <a href="#" className="btn btn-link" onClick={this.handleDuplicate.bind(this)}>
                                    <i className="far fa-copy"></i>
                                </a>

                                : null}
                            {removeButton ?
                                <a href="#" className="btn btn-link text-danger" onClick={this.handleRemove.bind(this)}>
                                    <i className="fas fa-trash-alt"></i>
                                </a>
                                : null}
                        </div>
                    </div>
                    <div className="row-container-body">
                        <div className="row">
                            <div className="col-xs-12">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RowContainer.propTypes = {

    editButton: PropTypes.bool,
    duplicateButton: PropTypes.bool,
    columnsButton: PropTypes.bool,
    removeButton: PropTypes.bool,

    onUp: PropTypes.func,
    onDown: PropTypes.func,
    onEdit: PropTypes.func,
    onDuplicate: PropTypes.func,
    onRemove: PropTypes.func,

};
