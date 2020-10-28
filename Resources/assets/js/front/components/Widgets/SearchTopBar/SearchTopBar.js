import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ModalSearch from './components/ModalSearch';
import './SearchTopBar.scss';

export default class SearchTopBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: false,
            valueSearch: ''
        }
    }

    // ==============================
    // Handlers
    // ==============================


    handleChange(event) {
        this.setState({
            display: true,
            valueSearch: event.target.value
        });
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
                    <a href="#" className="tooltip-link-action" title={'notification'}><span className="notification icon"><span className="number">6</span></span></a>
                </div>
            </div>
        )
    }
}

if (document.getElementById('searchTopBar')) {
    ReactDOM.render(<SearchTopBar
    />, document.getElementById('searchTopBar'));
}



