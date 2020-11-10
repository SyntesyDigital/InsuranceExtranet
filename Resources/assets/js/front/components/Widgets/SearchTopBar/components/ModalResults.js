import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from './../../../Common/Spinner';
import './ModalSearch.scss';

export default class ModalResults extends Component {

    constructor(props) {
        super(props);

        const max = SITE_CONFIG_GENERAL.SEARCH_MAX_RESULTS !== undefined
            ? SITE_CONFIG_GENERAL.SEARCH_MAX_RESULTS.value
            : 5;

        const searchingMessage = SITE_CONFIG_GENERAL.SEARCHING_MESSAGE && SITE_CONFIG_GENERAL.SEARCHING_MESSAGE.value
            ? SITE_CONFIG_GENERAL.SEARCHING_MESSAGE.value
            : "En course de recherche";
        const noResultsMessage = SITE_CONFIG_GENERAL.NO_RESULTS_MESSAGE && SITE_CONFIG_GENERAL.NO_RESULTS_MESSAGE.value
            ? SITE_CONFIG_GENERAL.NO_RESULTS_MESSAGE.value
            : "Aucune donnée trouvée"

        this.state = {
            searchingMessage: searchingMessage,
            noResultsMessage: noResultsMessage,
            max: max
        };

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
                <span className="highlight">{str.substring(index, index + q.length)}</span>
                {str.substring(index + q.length)}
            </div>
        }

        return false;
    }

    renderResultsRows(results, total) {

        var count = 0;
        var rows = results.map((obj, k) => {
            if (this.highlight(obj.lib) !== false && count < this.state.max) {
                ++count;
                return (<li key={k}>
                    <a href={obj.url}><span>{this.highlight(obj.lib)}</span></a>
                </li>);
            }
        });

        //console.log("renderResultsRows :: rows.length < results.length",rows,rows.length,results,results.length);

        if (count < total) {
            rows.push(<li key={rows.length + 1}>
                ...
            </li>);
        }

        return rows;
    }

    getKeyResultsTotal(results) {
        let count = 0;

        results.map((obj, k) => {
            if (this.highlight(obj.lib) !== false) {
                count++;
            }
        });

        return count;
    }

    renderResults() {
        let results = this.props.results;

        if (Object.keys(results).length == 0) {
            return null;
        }

        return (Object.keys(results).map((label) => {

            var total = this.getKeyResultsTotal(results[label]);

            return (
                <div className="row-result" key={label}>
                    <h4>{label} ({total})</h4>
                    <ul>
                        {this.renderResultsRows(results[label], total)}
                    </ul>
                </div>
            )
        }));
    }

    render() {

        const hasData = this.props.results && Object.keys(this.props.results).length > 0;

        return (
            <div className="container-results">
                {this.props.loading &&
                    <span>{this.state.searchingMessage}</span>
                }
                {this.props.loading &&
                    <Spinner
                        size={50}
                        color={'red'}
                        loading={this.props.loading}
                    />
                }
                {!this.props.loading && !hasData &&
                    <span>{this.state.noResultsMessage}</span>
                }

                {!this.props.loading && hasData &&
                    this.renderResults()
                }
            </div>
        );
    }
}

ModalResults.propTypes = {
    results: PropTypes.object,
    valueSearch: PropTypes.string,
};

