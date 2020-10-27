import React, { Component } from 'react';
import ModalSearch from './components/ModalSearch';
import './SearchTopBar.scss';

class SearchTopBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: false,
            valueSearch: null
        }
    }

    handleFocus() {
        this.setState({
            display: true,
        });
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
                />
                <label>
                    <input
                        type="text"
                        name="search"
                        value={this.state.valueSearch}
                        onChange={this.handleFocus.bind(this)}
                        placeholder="Recherche"
                    />
                </label>
            </div>
        )
    }


}

export default SearchTopBar;