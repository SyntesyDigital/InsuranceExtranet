import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-table/react-table.css";

import TableComponent from './TableComponent';
import ModalTable from './ModalTable';

import moment from 'moment';

export default class ElementTable extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
          displayModal : false,
          modalUrl : null,
          redirectUrl : null,
          id :  props.model.ID+moment().unix()
        };
        this.tableRef = React.createRef();
    }

    /**
    * Open modal with url [element_id]?[params]
    */
    handleOpenModal(elementUrl,redirectUrl){
      console.log("ElementTable :: handleOpenModal : (elementUrl,redirectUrl)",elementUrl,redirectUrl);

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
                field={this.props.field}
                display={this.state.displayModal}
                id={"modal-table-component-"+this.state.id}
                zIndex={1000}
                onModalClose={this.handleModalClose.bind(this)}
                modalUrl={this.state.modalUrl}
                redirectUrl={this.state.redirectUrl}
                onOpenModal={this.handleOpenModal.bind(this)}
                onFormFinished={this.handleFormFinished.bind(this)}
              />

              <TableComponent
                id={this.state.id}
                ref={this.tableRef}
                field={this.props.field}
                elementObject={this.props.elementObject}
                model={this.props.model}
                pagination={this.props.pagination}
                itemsPerPage={this.props.itemsPerPage}
                maxItems={this.props.maxItems}
                hideEmptyRows={this.props.hideEmptyRows}
                parameters={this.props.parameters}
                onOpenModal={this.handleOpenModal.bind(this)}
                exportBtn={this.props.exportBtn}
                downloadUrl={this.props.downloadUrl}
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
       var hideEmptyRows = element.getAttribute('hideEmptyRows');
       var pagination = element.getAttribute('pagination');
       var itemsPerPage = element.getAttribute('itemsPerPage');
       var parameters = element.getAttribute('parameters');
       var exportBtn = element.getAttribute('exportBtn');
       var downloadUrl = element.getAttribute('downloadUrl');
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
           exportBtn={exportBtn}
           downloadUrl={downloadUrl}
           hideEmptyRows={hideEmptyRows}
         />, element);
   });
}
