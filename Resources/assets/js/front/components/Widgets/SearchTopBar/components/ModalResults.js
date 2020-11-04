import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Modal';
import './ModalSearch.scss';

export default class ModalResults extends Component {

    constructor(props) {
        super(props);
    }

    // ==============================
    // Renderers
    // ==============================

    renderRowResults() {
        return (this.props.results.map((item, i) => (
            <div className="row-result" key={i}>
                <h4>{'Numero de contract'}</h4>
                <a href="#"><span>122131254</span></a>
                <a href="#"><span>122131254</span></a>
            </div>
        )));
    }

    render() {
        return (
            <div className="container-results">
                {this.renderRowResults()}
            </div>
        );
    }
}

ModalResults.propTypes = {
    results: PropTypes.array,
};

