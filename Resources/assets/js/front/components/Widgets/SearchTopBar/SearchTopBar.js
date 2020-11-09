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

        const minCharacters = SITE_CONFIG_GENERAL.SEARCH_MIN_CHARACTERS && SITE_CONFIG_GENERAL.SEARCH_MIN_CHARACTERS.value
            ? parseInt(SITE_CONFIG_GENERAL.SEARCH_MIN_CHARACTERS.value) 
            : 3;
        const minMessage = SITE_CONFIG_GENERAL.SEARCH_MESSAGE && SITE_CONFIG_GENERAL.SEARCH_MESSAGE.value
            ? SITE_CONFIG_GENERAL.SEARCH_MESSAGE.value
            : "Veuillez entrer 3 caractères ou plus";

        this.state = {
            display: false,
            valueSearch: '',
            results: [],
            timer: null,
            minCharacters : minCharacters,
            minMessage : minMessage,
            loading : false,
            loaded : false
        };
    }

    componentDidUpdate(prevProps,pevState) {

        
    }

    // ==============================
    // Handlers
    // ==============================

    /**
     * If click in input or to search icon, open the modal again. In case is closed by 
     * the close button.
     */
    handleSearchClick() {
        const query = this.state.valueSearch;
        this.query(query);
    }

    hasFristCharactersChanged(newQuery) {
        const {valueSearch} = this.state;


    }

    handleChange(event) {
        
        const query = event.target.value;

        this.query(query);
    }

    /**
     * Function to check the logic if necessary to reload or not.
     * Reload is always with just X charaters of the value
     */
    needReload(newQuery) {

        const {minCharacters,valueSearch,loaded} = this.state;
        
        //if newQuery is less than X characters 
        if(newQuery.length < minCharacters){
            //console.log("needReload :: new Query less than X characters  ",newQuery, false)
            return false;
        }
        
        //if the first X characters has changed
        if(newQuery.substring(0,minCharacters) != valueSearch.substring(0,minCharacters)){
            //console.log("needReload :: the first X characters has changed ",newQuery,valueSearch, true)
            return true;
        }

        //if query length is the same of minCharacters then reload
        if(!loaded && newQuery.length == minCharacters){
            //console.log("needReload ::  query length is the same of minCharacters then reload ",newQuery, true)
            return true;
        }

        //console.log("needReload :: no conditions accepted", newQuery, false)

        return false;
    }

    query(query) {
        
        let self = this;
        const {minCharacters,display,loaded,results} = this.state;
        let loading = this.state.loading;

        //we are in the middle of the loading don't do nothing
        /*
        TO BLOCK DURING LOADING
        if(loading)
            return null;
        */

        if(this.needReload(query)) {

            loading = true;
            axios.get('/search?q=' + query.substring(0,minCharacters))
                .then(response => {
                    self.setState({
                        results: response.data.data,
                        loading : false,
                        loaded : true
                    });
                });
        }

        var newDisplay = false;
        
        if(query.length >= minCharacters ) {
            newDisplay = true; 
        }
        else if(query.length < minCharacters) {
            newDisplay = false;
            this.searchInput.focus(); 
        }

        this.setState({
            valueSearch: query,
            display: newDisplay,
            loading : loading,
            //if modal is hidden also put loaded to false, to reload, else left the state that it was before
            loaded : !newDisplay ? false : loaded,
            //the same with results, if hidden, remove results
            results: !newDisplay ? [] : results
        });
    }

    handleModalClose() {

        this.searchInput.focus(); 

        this.setState({
            display: false,
            loaded:false,
            loading:false,
            results:[]
        });
    }
    

    // ==============================
    // Renderers
    // ==============================

    render() {

        const {valueSearch,minCharacters,loading} = this.state;

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
                    loading={this.state.loading}
                />
                <label onClick={this.handleSearchClick.bind(this)}>
                    <input
                        ref={(input) => { this.searchInput = input; }} 
                        type="text"
                        name="search"
                        value={this.state.valueSearch}
                        onChange={this.handleChange.bind(this)}
                        placeholder="Recherche"
                        className="input-search"
                    />
                </label>
                {valueSearch.length > 0 && valueSearch.length < minCharacters && 
                    <div className="help-message">
                        {this.state.minMessage}
                    </div>
                }

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



