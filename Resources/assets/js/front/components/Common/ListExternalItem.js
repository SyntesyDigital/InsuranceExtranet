import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Member from './../Typologies/Member';
import Agency from './../Typologies/Agency';
import Company from './../Typologies/Company';


class ListExternalItem extends Component {

    constructor(props)
    {
        super(props);

    }

    renderItem() {

      switch(this.props.type){
        case 'member' :
          return (
              <Member
                field={this.props.field}
              />
           );
       case 'company' :
         return (
             <Company
               field={this.props.field}
             />
          );
      case 'agency' :
        return (
            <Agency
              field={this.props.field}
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

export default ListExternalItem;
