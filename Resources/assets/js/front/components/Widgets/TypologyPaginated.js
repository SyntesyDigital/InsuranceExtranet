import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MoreResults from './../Common/MoreResults';
import ListItem from './../Common/ListItem';


export default class TypologyPaginated extends Component {

    constructor(props)
    {
        super(props);

        const field = props.field ? JSON.parse(atob(props.field)) : '';

        this.state = {
            field : field,
            items : null,
            lastPage : null,
            currPage : null,
            loaded: false,
            size:field.settings.itemsPerPage !== undefined && field.settings.itemsPerPage != null ?  field.settings.itemsPerPage : 3,
        };
    }

    componentDidMount() {
        this.query(1);
    }

    query(page) {
        const field = this.state.field;
        var self = this;
        const size = this.state.size;
        const category = field.settings.category;
        const maxItems = field.settings.maxItems?parseInt(field.settings.maxItems):null;
        var size_limited = size;
        const categoryQuery = category != null ? "&category_id="+category : '';

          if(maxItems && size > maxItems){
            size_limited = maxItems;
          }

        axios.get(ASSETS+'api/contents?size='+size_limited+'&typology_id=' + field.settings.typology + categoryQuery + '&page=' + (page ? page : null))
          .then(function (response) {

              if(response.status == 200
                  && response.data.data !== undefined)
              {
                  var old_items = self.state.items;
                  if(response.data.meta.current_page != 1){
                    if(maxItems &&  ((self.state.currPage+1) * size) > maxItems){
                      old_items.push.apply(old_items, response.data.data.slice(0,maxItems - self.state.currPage * size));
                    }else{
                      old_items.push.apply(old_items, response.data.data);
                    }

                  }else{
                    old_items =response.data.data;
                  }
                  self.setState({
                      items : old_items,
                      lastPage : response.data.meta.last_page,
                      currPage : response.data.meta.current_page,
                  });
              }


          }).catch(function (error) {
             console.log(error);
           });
    }


    renderItems() {

      var result = [];

      const {items,field} = this.state;

      const extended = field.settings.extended != null ? field.settings.extended : false;

      for(var key in items){
        console.log("TypologyPaginated => ",items[key]);

        result.push(
          <li key={key}>
            <ListItem
              field={items[key]}
              extended={extended}
            />
          </li>
        );
      }

      return result;
    }

    onPageChange(page) {
        this.query(page);
    }

    render() {

        return (
            <div>
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
                      maxItems={this.state.field.settings.maxItems}
                      currentItems={this.state.items.length}
                      onChange={this.onPageChange.bind(this)}
                    />
                }
            </div>
        );
    }
}

if (document.getElementById('typology-paginated')) {

    document.querySelectorAll('[id=typology-paginated]').forEach( element => {

      var field = element.getAttribute('field');

      ReactDOM.render(<TypologyPaginated
          field={field}
        />, element);
    });
}
