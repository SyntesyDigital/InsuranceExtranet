import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ColContainer extends Component {

    constructor(props) {
        super(props);
    }

    // ==============================
    // Handlers
    // ==============================

    handleAdd(e){
        e.preventDefault();
        this.props.onAdd();
    }

    handleEdit(e){
        e.preventDefault();
        this.props.onEdit();
    }

    // ==============================
    // Renderers
    // ==============================

    render() {
        const { editButton } = this.props;
        return (
            <div className="col-container">
                <div className="row-container-body-content">
                    <div className="row-container-body-top">
                        {editButton ?
                            <a href="#" className="btn btn-link" onClick={this.handleEdit.bind(this)}>
                                <i className="fa fa-pencil-alt"></i>
                            </a>
                        : null}
                    </div>
                    <div>
                        {this.props.children}
                    </div>
                    <div className="row-empty-item">
                        <a href="#" className="btn btn-link" onClick={this.handleAdd.bind(this)}>
                            <i className="fa fa-plus"></i>
                        </a>
                    </div>
                    <div className="row-container-body-bottom"></div>
                </div>
            </div>
        );
    }
}

ColContainer.propTypes = {

    editButton: PropTypes.bool,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,

};
