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

    handleChange(event) {
        console.log("handleChange", event.target.value)
        this.setState({
            display: true,
            valueSearch: event.target.value
        });
        console.log("handleChange", this.state.valueSearch)
    }

    handleModalClose() {
        this.setState({
            display: false,
        });
    }

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
                    dataFromParent={this.state.valueSearch}
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
                    <a href="#" className="tooltip-link-action" title={'localisation'}><span className="localisation"></span></a>
                    <a href="#" className="tooltip-link-action" title={'draft'}><span className="draft"></span></a>
                    <a href="#" className="tooltip-link-action" title={'notification'}><span className="notification"></span></a>
                </div>
            </div>
        )
    }
}


if (document.getElementById('searchTopBar')) {
    ReactDOM.render(<SearchTopBar
    />, document.getElementById('searchTopBar'));
}



