import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class OrderBar extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
          order : ''
        };
    }

    onToggleOrder(event){
      event.preventDefault();

      console.log("OrderBar :: onToggleOrder => ");

      const {order} = this.state;
      var newOrder = '';

      if(order == ''){
        newOrder = 'asc';
      }
      else if(order == 'asc'){
        newOrder = 'desc';
      }

      this.setState({
        order : newOrder
      });

      var query = '';
      if(newOrder != ''){
        query = this.props.fieldName+','+newOrder;
      }

      this.props.onSubmit(query);
    }

    render() {

        const {order} = this.state;

        return (
            <div className="order-bar centered">
              <a href="" onClick={this.onToggleOrder.bind(this)}>
                {window.localization['WIDGET_ORDER_BAR_BY_NAME']}   &nbsp;

                <i className={"fa fa-sort"+(order != '' ? '-'+order : '')}></i>
              </a>
            </div>
        );
    }
}

export default OrderBar;
