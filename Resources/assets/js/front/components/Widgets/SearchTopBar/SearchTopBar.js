import React, { Component } from 'react'
import ModalSearch from './components/ModalSearch'

class SearchTopBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: false
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
            <div>
                <ModalSearch
                    id={'modal-search'}
                    zIndex={10000}
                    size={'medium'}
                    display={this.state.display}
                    onModalClose={this.handleModalClose.bind(this)}
                    deleteButton={false}
                />
                <input
                    type="text"
                    className="form-control"
                    name="searrch"
                    value={''}
                    onChange={this.handleFocus.bind(this)}
                />
            </div>
        )
    }


}

export default SearchTopBar;