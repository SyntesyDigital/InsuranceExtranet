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

    highlight(str) {
        let q = this.props.valueSearch;
        let index = str.indexOf(q);

        if (index >= 0) {
            return <div>
                {str.substring(0, index)}
                <span class="highlight">{str.substring(index, index + q.length)}</span>
                {str.substring(index + q.length)}
            </div>
        }

        return str;
    }

    renderRowResults(results) {
        return (results.map((obj,k) => (
            <li key={k}>
                <a href={obj.url}><span>{this.highlight(obj.lib)}</span></a>
            </li>
        )));
    }
    
    renderResults() {
        let results = this.props.results;

        return (Object.keys(results).map((label) => (
            <div className="row-result" key={label}>
                <h4>{label}</h4>
                <ul>
                    {this.renderRowResults(results[label])}
                </ul>
            </div>
        )));
    }

    render() {
        return (
            <div className="container-results">
                {this.renderResults()}
            </div>
        );
    }
}

ModalResults.propTypes = {
    results: PropTypes.array,
    valueSearch: PropTypes.string,
};

