import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ListItem from './../Common/ListItem';

export default class TypologyLast extends Component {

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
      const size = parseInt(field.settings.maxItems);

      const categoryQuery = category != null ? "&category_id="+category : '';
      const sizeQuery = size != null && !isNaN(size) ? "&size="+size : '';

      axios.get(ASSETS+'api/contents?typology_id='+typology+categoryQuery+sizeQuery)
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
        console.log("TypologyLast => ",items[key]);

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

    render() {

        return (
            <div>
              {window.localization['MENU_FOOTER_1']}
              {this.state.items == null &&
                <p>
                  {/*Carregant dades...*/}
                </p>
              }

              {this.state.items != null && this.state.items.length == 0 &&
                <p>
                  {window.localization['GENERAL_WIDGET_LAST_TYPOLOGY_EMPTY']}
                </p>
              }

              {this.state.items != null && this.state.items.length > 0 &&
                <ul>
                  {this.renderItems()}
                </ul>
              }

            </div>
        );
    }
}

if (document.getElementById('typology-last')) {

    document.querySelectorAll('[id=typology-last]').forEach( element => {

      var field = element.getAttribute('field');

      ReactDOM.render(<TypologyLast
          field={field}
        />, element);
    });
}
