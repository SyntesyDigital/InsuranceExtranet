import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import MoreResults from './../Common/MoreResults';
//import Paginator from './../Common/Paginator';
//import ReactDataGrid from 'react-data-grid';
//import { Toolbar, Data } from "react-data-grid-addons";

import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter'

import TableComponent from './Table/TableComponent';
import ModalTable from './Table/ModalTable';

import moment from 'moment';

//const selectors = Data.Selectors;

export default class ElementTable extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
          displayModal : false,
          modalUrl : null
        };
    }

    /**
    * Open modal with url [element_id]?[params]
    */
    handleOpenModal(elementUrl){
      console.log("ElementTable :: handleOpenModal : ",elementUrl);

      this.setState({
        displayModal : true,
        modalUrl : elementUrl
      });
    }

    handleModalClose(){
      this.setState({
        displayModal : false
      });
    }

    render() {
        return (
            <div>

              <ModalTable
                display={this.state.displayModal}
                id={"modal-table-component"}
                zIndex={1000}
                onModalClose={this.handleModalClose.bind(this)}
                modalUrl={this.state.modalUrl}
                onOpenModal={this.handleOpenModal.bind(this)}
              />

              <TableComponent
                //field={this.props.field}
                elementObject={this.props.elementObject}
                model={this.props.model}
                pagination={this.props.pagination}
                itemsPerPage={this.props.itemsPerPage}
                maxItems={this.props.maxItems}
                parameters={this.props.parameters}
                onOpenModal={this.handleOpenModal.bind(this)}
              />
            </div>

        );

    }
}

if (document.getElementById('elementTable')) {

   document.querySelectorAll('[id=elementTable]').forEach(function(element){
       var field = element.getAttribute('field');
       //var elementObject = element.getAttribute('elementObject');
       //var model = element.getAttribute('model');
       var maxItems = element.getAttribute('maxItems');
       var pagination = element.getAttribute('pagination');
       var itemsPerPage = element.getAttribute('itemsPerPage');
       var parameters = element.getAttribute('parameters');

       var elementObject = JSON.parse(atob(element.getAttribute('elementObject')));
       var model = JSON.parse(atob(element.getAttribute('model')));

       ReactDOM.render(<ElementTable
           field={field}
           elementObject={elementObject}
           model={model}
           pagination={pagination}
           itemsPerPage={itemsPerPage}
           maxItems={maxItems}
           parameters={parameters}
         />, element);
   });
}
