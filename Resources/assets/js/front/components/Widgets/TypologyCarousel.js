import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ListItem from './../Common/ListItem';

export default class TypologyCarousel extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            field : props.field ? JSON.parse(atob(props.field)) : '',
            items : null
        };
    }

    componentDidMount() {

      var self = this;
      const field = this.state.field;

      const typology = field.settings.typology;
      const category = field.settings.category;

      const categoryQuery = category != null ? "&category_id="+category : '';

      axios.get(ASSETS+'api/contents?typology_id='+typology+categoryQuery)
        .then(response => {
          var items = [];

          if(response.status == 200 && response.data.data !== undefined
            && response.data.data.length > 0){
                items = response.data.data;
          }

          self.setState({
            items : items
          });

        })
         .catch(function (error) {
           console.log(error);
         });

    }

    renderItems() {

      var result = [];

      const {items} = this.state;

      for(var key in items){
        console.log("TypologyCarousel => ",items[key]);

        result.push(
          <div className={"item "+(key == 0 ? 'active' : '') } key={key}>
            <ListItem
              field={items[key]}
            />
          </div>
        );
      }

      return result;
    }

    render() {

        return (
          <div id="carousel2" className="carousel slide" data-ride="carousel2">
            <div className="carousel-inner" role="listbox">
              {this.state.items != null && this.state.items.length == 0 &&
                <p>
                  {window.localization['GENERAL_WIDGET_LAST_TYPOLOGY_EMPTY']}
                </p>
              }

              {this.state.items != null && this.state.items.length > 0 &&
                this.renderItems()
              }

            </div>
            {this.state.items != null && this.state.items.length > 1 &&
              <span>
                <a className="left carousel-control" href="#carousel2" role="button" data-slide="prev"><span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span><span className="sr-only">Previous</span></a>
                <a className="right carousel-control" href="#carousel2" role="button" data-slide="next"><span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span><span className="sr-only">Next</span></a>
              </span>
            }
          </div>
        );
    }
}

if (document.getElementById('typology-carousel')) {

    document.querySelectorAll('[id=typology-carousel]').forEach( element => {

      var field = element.getAttribute('field');

      ReactDOM.render(<TypologyCarousel
          field={field}
        />, element);
    });
}
