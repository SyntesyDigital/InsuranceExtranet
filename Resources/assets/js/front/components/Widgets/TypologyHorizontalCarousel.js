import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MoreResults from './../Common/MoreResults';
import ListItem from './../Common/ListItem';


export default class TypologyHorizontalCarousel extends Component {

    constructor(props)
    {
        super(props);

        const field = props.field ? JSON.parse(atob(props.field)) : '';
        this.itemsPerPage = 4;
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
        const size = field.settings.maxItems ? parseInt(field.settings.maxItems) : 12;
        const category = field.settings.category;
        const categoryQuery = category != null ? "&category_id="+category : '';

        axios.get(ASSETS+'api/contents?size='+size+'&typology_id=' + field.settings.typology + categoryQuery )
          .then(function (response) {

              if(response.status == 200
                  && response.data.data !== undefined)
              {

                  self.setState({
                      items : response.data.data,
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
        console.log("TypologyHorizontalCarousel => ",items[key]);

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

    renderPage(items) {

      return items.map((item,key) =>
        <li key={key} className="col-md-3  col-sm-3 col-xs-12">
          <ListItem
            key={key}
            field={item}
          />
        </li>
      );

    }

    renderPages() {

      const {items} = this.state;
      const itemsPerPage = this.itemsPerPage;

      if(items == null){
        return;
      }
      if(items != null && items.length == 0){
        return (
          <p>{window.localization['GENERAL_WIDGET_LAST_TYPOLOGY_EMPTY']}</p>
        );
      }

      var itemsResult = {};
      const pages = Math.ceil(items.length/itemsPerPage);

      for(var i=0;i<items.length;i++){
        var page = Math.ceil((i+1)/itemsPerPage);
        if(itemsResult[page] === undefined){
          itemsResult[page] = [];
        }
        itemsResult[page].push(items[i]);
      }

      console.log("TypologyHorizontalCarousel :: itemsResult => ",itemsResult,Object.keys(itemsResult));

      var result = [];

      for(var key in itemsResult){
        result.push(
          <div key={key} className={"item " + ( key == "1" ? 'active' : '') }>
             <ul>
              {this.renderPage(itemsResult[key])}
            </ul>
         </div>
        )
      }

      return result;
    }

    render() {


        return (
          <div id="carousel-multiple" className="carousel carousel-multiple slide" data-ride="carousel-multiple">
            <div className="carousel-inner" role="listbox">
              {this.renderPages()}
				    </div>
            {this.state.items != null && this.state.items.length > this.itemsPerPage &&
              <span>
                <a className="left carousel-control" href="#carousel-multiple" role="button" data-slide="prev"><span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span><span className="sr-only">Previous</span></a>
             		<a className="right carousel-control" href="#carousel-multiple" role="button" data-slide="next"><span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span><span className="sr-only">Next</span></a>
                </span>
              }
          </div>
        )
    }
}

if (document.getElementById('typology-horizontal-carousel')) {

    document.querySelectorAll('[id=typology-horizontal-carousel]').forEach( element => {

      var field = element.getAttribute('field');

      ReactDOM.render(<TypologyHorizontalCarousel
          field={field}
        />, element);
    });
}
