import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ModalSearch from './components/ModalSearch';
import ActionNotification from '../ActionNotification/ActionNotification';
import './SearchTopBar.scss';

export default class SearchTopBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display: false,
            valueSearch: '',
            results: []
        };
    }


    // ==============================
    // Handlers
    // ==============================

    handleChange(event) {
        let valueSearch = event.target.value;
        this.setState({
            valueSearch: valueSearch,
            display: true
        });

        if(valueSearch.length >= 1) {
            axios.get('/search?q=' + valueSearch)
                .then(response => {
                    this.setState({
                        results: response.data.data
                    });
                });
        }
    }

    handleModalClose() {
        this.setState({
            display: false,
        });
    }
    

    // ==============================
    // Renderers
    // ==============================

    render() {
        return (
            <div className="search-top-bar">
                <ModalSearch
                    id={'modal-search'}
                    zIndex={10000}
                    size={'medium'}
                    display={this.state.display}
                    onModalClose={this.handleModalClose.bind(this)}
                    deleteButton={false}
                    valueSearch={this.state.valueSearch}
                    results={this.state.results}
                    onChangeSearch={this.handleChange.bind(this)}
                />
                <label>
                    <input
                        type="text"
                        name="search"
                        value={this.state.valueSearch}
                        onChange={this.handleChange.bind(this)}
                        placeholder="Recherche"
                    />
                </label>
                <div className="actions-header">
                    <a href="#" className="tooltip-link-action" title={'localisation'}><span className="localisation icon"><span className="number">12</span></span></a>
                    <a href="#" className="tooltip-link-action" title={'draft'}><span className="draft icon"><span className="number">4</span></span></a>
                    <ActionNotification />
                </div>
            </div>
        )
    }
}

if (document.getElementById('searchTopBar')) {
    ReactDOM.render(<SearchTopBar
    />, document.getElementById('searchTopBar'));
}



