import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-table/react-table.css";

import TableComponent from './Table/TableComponent';
import ModalTable from './Table/ModalTable';

//const selectors = Data.Selectors;

export default class ElementTable extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
          displayModal : false,
          modalUrl : null,
          redirectUrl : null
        };
        this.tableRef = React.createRef();
    }

    /**
    * Open modal with url [element_id]?[params]
    */
    handleOpenModal(elementUrl,redirectUrl){
      //console.log("ElementTable :: handleOpenModal : ",elementUrl);

      this.setState({
        displayModal : true,
        modalUrl : elementUrl,
        redirectUrl : redirectUrl
      });
    }

    handleModalClose(){
      this.setState({
        displayModal : false
      });
    }

    handleFormFinished() {

      this.setState({
        displayModal : false
      });

      this.tableRef.current.refreshTable();
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
                redirectUrl={this.state.redirectUrl}
                onOpenModal={this.handleOpenModal.bind(this)}
                onFormFinished={this.handleFormFinished.bind(this)}
              />

              <TableComponent
                ref={this.tableRef}
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
