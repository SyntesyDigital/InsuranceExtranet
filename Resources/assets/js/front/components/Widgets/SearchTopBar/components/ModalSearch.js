import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Modal';
import './ModalSearch.scss';

export default class ModalSearch extends Component {

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

    handleClickNumResult() {
        console.log("handleClickNumResult :: ");
    }

    // ==============================
    // Renderers
    // ==============================

    renderRowResults() {
        return (this.state.results.map((item, i) => (
            <div className="row-result">
                <h4>{'Numero de contract'}</h4>
                <a href="#" onClick={this.handleClickNumResult.bind(this)}><span>122131254</span></a>
                <a href="#" onClick={this.handleClickNumResult.bind(this)}><span>122131254</span></a>
            </div>
        ))
        );
    }

    render() {
        return (
            <Modal
                id={this.props.id}
                title={this.props.title}
                display={this.props.display}
                zIndex={10000}
                onModalClose={this.props.onModalClose}
                size={'medium'}
                deleteButton={false}
                cancelButton={false}
                submitButton={false}
            >
                <label>
                    <input
                        type="text"
                        name="search"
                        value={this.props.valueSearch}
                        onChange={this.handleOnChange.bind(this)}
                        placeholder="Recherche"
                    />
                </label>
                <div className="col-xs-12 results">
                    <div className="container-results">
                        {this.renderRowResults()}
                    </div>
                </div>
            </Modal>
        );
    }
}

ModalSearch.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    valueSearch: PropTypes.string.isRequired,
    onChangeSearch: PropTypes.func
};

