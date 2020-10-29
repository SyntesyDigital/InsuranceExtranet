import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import './ModalSidebar.scss';

export default class ModalSidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
    }

    // ==============================
    // Handlers
    // ==============================

    handleOnChange(e) {
        this.props.onChangeSearch(e.target.value);
    }

    handleClickDate() {
        console.log("handleClickDate :: ");
    }

    handleRemoveItem(){
        console.log("handleRemoveItem :: ");
    }

    // ==============================
    // Renderers
    // ==============================

    renderRowItems() {
        return (this.state.results.map((item, i) => (
            <div key={i} className="row-item">
                <h5>{'Numero de contract'}</h5>
                <a href="#" className="date-link" onClick={this.handleClickDate.bind(this)}><span className="date">22 avril 2020</span></a>
                <a href="#" className="trash-link" onClick={this.handleRemoveItem.bind(this)}><span className="trash"></span></a>
            </div>
        ))
        );
    }

    render() {
        return (
            <div className="modal-sidebar">
                <div className="wrapper-items">
                    {this.renderRowItems()}
                </div>
            </div>
        );
    }
}

ModalSidebar.propTypes = {
    title: PropTypes.string,
    display: PropTypes.bool,
    zIndex: PropTypes.number,
    onCancel: PropTypes.func,
    onModalClose: PropTypes.func,
};

