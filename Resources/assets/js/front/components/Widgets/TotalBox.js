import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import MoreResults from './../Common/MoreResults';
//import Paginator from './../Common/Paginator';
//import ReactDataGrid from 'react-data-grid';
//import { Toolbar, Data } from "react-data-grid-addons";

import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter'

import moment from 'moment';

//const selectors = Data.Selectors;

export default class TotalBox extends Component {

    constructor(props)
    {
        super(props);

        const elementObject = props.elementObject ? JSON.parse(atob(props.elementObject)) : null;
        const model = props.model ? JSON.parse(atob(props.model)) : null;

        this.state = {
            elementObject :elementObject,
            total: null,
            model : model
        };
    }

    componentDidMount() {

        this.query();
    }

    getUrlParameters() {
      //concat parameters, first constant parameters
      var parameters = this.state.model.DEF1 != null ?
        this.state.model.DEF1 : '';

      if(parameters != '')
        parameters += "&";

      //then
      parameters += this.props.parameters;

      return parameters;
    }

    query() {
        var self = this;
        const {elementObject} = this.state;
        const parameters = this.getUrlParameters();

        axios.get(ASSETS+'architect/extranet/'+elementObject.id+'/model_values/data/1/?'+parameters)
          .then(function (response) {
              if(response.status == 200
                  && response.data.modelValues !== undefined)
              {
                console.log("ModelValues  :: componentDidMount => ",response.data);

                self.setState({
                  total: response.data.total != null ? response.data.total : 0
                });
              }

          }).catch(function (error) {
             console.log(error);
             self.setState({
               loading: false
             });
           });
    }

    render() {
        return (
            <div>
              {this.state.total}
            </div>

        );

    }
}

if (document.getElementById('totalBox')) {

   document.querySelectorAll('[id=totalBox]').forEach(function(element){
       var elementObject = element.getAttribute('elementObject');
       var model = element.getAttribute('model');
       var parameters = element.getAttribute('parameters');

       ReactDOM.render(<TotalBox
           elementObject={elementObject}
           model={model}
           parameters={parameters}
         />, element);
   });
}
