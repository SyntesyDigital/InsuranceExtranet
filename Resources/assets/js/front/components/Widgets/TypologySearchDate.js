import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MoreResults from './../Common/MoreResults';
import FilterBar from './../Common/FilterBar';
import ListItem from './../Common/ListItem';


export default class TypologySearchDate extends Component {

    constructor(props)
    {
        super(props);

        const field = props.field ? JSON.parse(atob(props.field)) : '';
        const textIdentifier =  field.settings.textIdentifier !== undefined ? field.settings.textIdentifier : null;
        const dateIdentifier =  field.settings.dateIdentifier !== undefined ? field.settings.dateIdentifier : null;


        console.log("TypologySearchDate => ",field);

        this.state = {
            field : field,
            items : null,
            lastPage : null,
            currPage : null,
            loaded: false,
            textIdentifier : textIdentifier,
            dateIdentifier : dateIdentifier,
            filters : null,
            size:field.settings.itemsPerPage !== undefined ?  field.settings.itemsPerPage : 3,
        };
    }

    componentDidMount() {

        const {filters} = this.state;

        this.query(1,filters);
    }

    query(page,filters) {
        var self = this;

        var searchQuery = '';
        var datesQuery = '';

        const {textIdentifier,dateIdentifier,field} = this.state;

        if(filters != null){

          var fieldsQuery = '[:query]';

          if(textIdentifier != null && filters.text != null){
            searchQuery = '["'+textIdentifier+'","like","%'+filters.text+'%"]';
          }
          if(dateIdentifier != null && filters.startDate != null && filters.endDate != null) {
            datesQuery = '["'+dateIdentifier+'",">=","'+filters.startDate+'"]';
            datesQuery += ',["'+dateIdentifier+'","<=","'+filters.endDate+'"]';
          }

          var query = searchQuery+(searchQuery != '' && datesQuery != '' ? ',':'')+datesQuery;
          fieldsQuery = fieldsQuery.replace(':query',query);
        }

        //console.log("TypologySearchDate :: query : "+fieldsQuery);

        var params = {
            size : this.state.size,
            typology_id : field.settings.typology,
            fields : fieldsQuery,
            page : page ? page : null,
            accept_lang : LOCALE
        };

        axios.post(ASSETS+'api/contents',params)
          .then(function (response) {

              if(response.status == 200
                  && response.data.data !== undefined)
              {
                var old_items = self.state.items;
                if(response.data.meta.current_page != 1){
                  old_items.push.apply(old_items, response.data.data);
                }else{
                  old_items =response.data.data;
                }
                  self.setState({
                      items : old_items,
                      lastPage : response.data.meta.last_page,
                      currPage : response.data.meta.current_page,
                      filters : filters
                  });
              }


          }).catch(function (error) {
             console.log(error);
           });
    }


    renderItems() {

      var result = [];

      const {items} = this.state;

      for(var key in items){
        console.log("TypologyPaginated => ",items[key]);

        result.push(
          <li key={key}>
            <ListItem
              field={items[key]}
            />
          </li>
        );
      }

      return result;
    }

    onPageChange(page) {
        const {filters} = this.state;

        this.query(page,filters);
    }

    handleFilterSubmit(filters) {
      this.query(1,filters);
    }

    render() {
        return (
            <div>

                <FilterBar
                  displayText={this.state.textIdentifier != null ? true : false}
                  displayDates={this.state.dateIdentifier != null ? true : false}
                  onSubmit={this.handleFilterSubmit.bind(this)}
                />


                {this.state.items == null &&
                    <p>{/*Carregant dades...*/}</p>
                }

                {this.state.items != null && this.state.items.length == 0 &&
                    <p>{window.localization['GENERAL_WIDGET_LAST_TYPOLOGY_EMPTY']}</p>
                }

                {this.state.items != null && this.state.items.length > 0 &&
                    <ul>{this.renderItems()}</ul>
                }

                {this.state.lastPage &&
                    <MoreResults
                      currPage={this.state.currPage}
                      lastPage={this.state.lastPage}
                      onChange={this.onPageChange.bind(this)}
                    />
                }
            </div>
        );
    }
}

if (document.getElementById('typology-search-date')) {

    document.querySelectorAll('[id=typology-search-date]').forEach( element => {

      var field = element.getAttribute('field');

      ReactDOM.render(<TypologySearchDate
          field={field}
        />, element);
    });
}
