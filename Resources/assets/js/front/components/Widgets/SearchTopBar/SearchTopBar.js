import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ModalSearch from './components/ModalSearch';
import './SearchTopBar.scss';
import ActionNotification from '../ActionTopBar/ActionNotification';
import ActionDraft from '../ActionTopBar/ActionDraft';
import ActionLocation from '../ActionTopBar/ActionLocation';

export default class SearchTopBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display: false,
            valueSearch: '',
            results: [],
            timer: null,
        };
    }


    // ==============================
    // Handlers
    // ==============================

    handleChange(event) {
        let query = event.target.value;
        let self = this;

        if(query.length == 2) {
            axios.get('/search?q=' + query)
                .then(response => {
                    self.setState({
                        results: response.data.data
                    });
                });
        }

        //
        // Start query only when user finish to write.
        //
        //clearTimeout(this.state.timer);
        // const timer = () => {
        //     return setTimeout(function (){
        //         axios.get('/search?q=' + query)
        //             .then(response => {
        //                 self.setState({
        //                     results: response.data.data
        //                 });
        //             });
        //     }, 500);
        // }

        this.setState({
            valueSearch: query,
            display: true,
            //timer: query.length == 3 ? timer() : null
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
        const hasBtnLocation = SITE_CONFIG_GENERAL.LOCALITATION_BTN !== undefined
            && SITE_CONFIG_GENERAL.LOCALITATION_BTN !== null
            && SITE_CONFIG_GENERAL.LOCALITATION_BTN.value === true ?
            true
            : false;
        const hasBtnDraft = SITE_CONFIG_GENERAL.DRAFT_BTN !== undefined
            && SITE_CONFIG_GENERAL.DRAFT_BTN !== null
            && SITE_CONFIG_GENERAL.DRAFT_BTN.value === true ?
            true
            : false;
        const hasBtnNotify = SITE_CONFIG_GENERAL.NOTIFICATION_BTN !== undefined
            && SITE_CONFIG_GENERAL.NOTIFICATION_BTN !== null
            && SITE_CONFIG_GENERAL.NOTIFICATION_BTN.value === true ?
            true
            : false;

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
                        className="input-search"
                    />
                </label>
                <div className="actions-header">
                    {hasBtnLocation ? <ActionLocation/> : null}
                    {hasBtnDraft ? <ActionDraft/> : null}
                    {hasBtnNotify ? <ActionNotification /> : null}
                </div>
            </div>
        )
    }
}

if (document.getElementById('searchTopBar')) {
    ReactDOM.render(<SearchTopBar
    />, document.getElementById('searchTopBar'));
}



