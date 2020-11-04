import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Modal';
import ModalResults from './ModalResults';
import './ModalSearch.scss';

export default class ModalSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: this.props.results
        };
        this.handleOnChange = this.handleOnChange.bind(this);
    }


    // ==============================
    // Handlers
    // ==============================

    handleOnChange(event) {
        this.props.onChangeSearch(event);
    }

    handleClickNumResult() {
        console.log("handleClickNumResult :: ");
    }

    parseResults(results) {
        let arr = {};

        results.map(row => {
            let key = row.category;

            if(typeof arr[key] === 'undefined') {
                arr[key] = [];
            } 

            arr[key].push(row);
        });

        return arr;
    }

    // ==============================
    // Renderers
    // ==============================
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
                    <ModalResults 
                        results={this.parseResults(this.props.results)}
                        valueSearch={this.props.valueSearch}
                    />
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
    onChangeSearch: PropTypes.func,
    results: PropTypes.array
};

