import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import News from './../Typologies/News';

class ListItem extends Component {

    constructor(props)
    {
        super(props);

    }

    renderItem() {

      switch(this.props.field.typology.identifier){
        case 'news' :
          return (
              <News
                field={this.props.field}
                extended={this.props.extended}
              />
           );
        default :
          return null;
      }
    }

    render() {
        return (
            this.renderItem()
        );
    }
}

export default ListItem;
