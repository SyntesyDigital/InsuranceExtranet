import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MoreResults from './../Common/MoreResults';
import FilterBar from './../Common/FilterBar';
import FilterBarPublication from './../Common/FilterBarPublication';
import FilterBarStatistics from './../Common/FilterBarStatistics';

import ListItem from './../Common/ListItem';
import ListSelectedItem from './../Common/ListSelectedItem';
import ModalForm from './../Common/ModalForm';
import OrderBar from './../Common/OrderBar';

import ModalFormWithSelection from './../Common/ModalFormWithSelection';
import ModalThanks from './../Common/ModalThanks';


const STATISTCS_ID = 6;
const PUBLICATIONS_ID = 4;
const CARTOGRAPHY_ID = 7;
//const LOGOS_ID =

export default class TypologySelectionFilters extends Component {

    constructor(props)
    {
        super(props);

        const field = props.field ? JSON.parse(atob(props.field)) : '';
        const textIdentifier =  field.settings.textIdentifier !== undefined ? field.settings.textIdentifier : null;
        const dateIdentifier =  field.settings.dateIdentifier !== undefined ? field.settings.dateIdentifier : null;
        const typology = field.settings.selectableTypology !== undefined ?  field.settings.selectableTypology : null;

        console.log("TypologySelectionFilters => ",field);

        this.state = {
            field : field,
            typology : typology,
            items : null,
            lastPage : null,
            currPage : null,
            loaded: false,
            textIdentifier : textIdentifier,
            dateIdentifier : dateIdentifier,
            filters : null,
            selectedItems : {},
            area : true,
            displayModal : false,
            displayThanks : false,
            size:field.settings.itemsPerPage !== undefined ?  field.settings.itemsPerPage : 3,
        };

        $("#selected-items").css({display:'block'});
        $("#selected-items").on('click',this.onShoppingCartClick.bind(this));
    }

    onShoppingCartClick(event){
      event.preventDefault();

      TweenMax.to($('html, body'),1.5, {
          scrollTop: $(".selected-list-row").offset().top,
          ease:Power2.easeInOut
        });

    }

    componentDidMount() {

        const {filters} = this.state;

        if(parseInt(this.state.typology) != STATISTCS_ID){
          this.query(1,filters);
        }
    }

    query(page,filters,order) {
        var self = this;

        const {textIdentifier,dateIdentifier,field,typology} = this.state;

        var filtersQuery = '';
        var filtersCategory = null;
        if(filters != null){
          filtersQuery = filters.query;
          if(filters.category_id != null){
            filtersCategory =filters.category_id;
          }
        }

        var params = {
            size : this.state.size,
            typology_id : typology,
            fields : filtersQuery,
            order : order,
            page : page ? page : null,
            accept_lang : LOCALE,
            category_id : filtersCategory
        };

        axios.post(ASSETS+'api/contents',params)
          .then(function (response) {
              if(response.status == 200
                  && response.data.data !== undefined)
              {
                var old_items = self.state.items;
                if(response.data.meta.current_page != 1){
                  old_items.push.apply(old_items, response.data.data);
                }else{
                  old_items =response.data.data;
                }
                  self.setState({
                      items : old_items,
                      lastPage : response.data.meta.last_page,
                      currPage : response.data.meta.current_page,
                      filters : filters,
                      order : order
                  });
              }


          }).catch(function (error) {
             console.log(error);
           });
    }

    handleOnSelect(field){
      console.log("TypologySelectionFilters :: => handleOnSelect ",field);

      const {selectedItems} = this.state;

      if(selectedItems[field.id] === undefined){
        selectedItems[field.id] = field;
      }

      this.setState({
        selectedItems : selectedItems
      });

      var size = Object.keys(selectedItems).length;
      $("#selected-items #number").html(size);

    }

    handleOnRemove(field) {
      console.log("TypologySelectionFilters :: => handleOnRemove ",field);

      const {selectedItems} = this.state;

      if(selectedItems[field.id] !== undefined){
        delete selectedItems[field.id];
      }

      this.setState({
        selectedItems : selectedItems
      });

      var size = Object.keys(selectedItems).length;
      $("#selected-items #number").html(size);
    }

    renderItems() {

      var result = [];

      const {items,selectedItems} = this.state;

      for(var key in items){

        var selected = selectedItems[items[key].id] !== undefined ? true : false;
        //console.log("TypologyPaginated => ",items[key],selectedItems,selected);

        result.push(
          <li key={key} className={selected ? 'selected' : ''}>
            <ListItem
              field={items[key]}
              selectable={true}
              selected={selected}
              onSelect={this.handleOnSelect.bind(this)}
            />
          </li>
        );
      }

      return result;
    }

    renderSelectedItems() {

      var result = [];

      const {selectedItems} = this.state;

      for(var key in selectedItems){

        result.push(
          <li key={key}>
            <ListSelectedItem
              field={selectedItems[key]}
              onRemove={this.handleOnRemove.bind(this)}
              onItemChange={this.handleOnSelectedChange.bind(this)}
            />
          </li>
        );
      }

      return result;
    }

    handleOnSelectedChange(inputs,id){
      const {selectedItems} = this.state;

      selectedItems[id].inputs = inputs;

      this.setState({
        selectedItems : selectedItems
      });
    }

    onPageChange(page) {
        const {filters,order} = this.state;

        this.query(page,filters,order);
    }

    handleFilterSubmit(filters) {

      const {order} = this.state;

      console.log("TypologySelectionFilters :: handleFilterSubmit => ",filters);

      this.query(1,filters,order);
    }

    handleOrderChange(order) {

      const {filters} = this.state;

      console.log("TypologySelectionFilters :: handleOrderChange => ",order);

      this.query(1,filters,order);
    }

    renderFilterBar() {

      console.log("TypologySelectionFilters :: renderFilterBar => ",this.state.typology,PUBLICATIONS_ID);

      switch(parseInt(this.state.typology)){
        case PUBLICATIONS_ID :
          return (
            <div>
              <FilterBarPublication
                onSubmit={this.handleFilterSubmit.bind(this)}
              />
              <OrderBar
                fieldName="title"
                onSubmit={this.handleOrderChange.bind(this)}
              />
            </div>
          );

        case STATISTCS_ID :
          return (
            <div>
              <FilterBarStatistics
                onSubmit={this.handleFilterSubmit.bind(this)}
              />
            </div>
          );
      }

    }

    renderSelectionArea() {
      return (
        <div className="row">
          <div className="container">
            <div className="col-xs-12 col-sm-offset-1 col-sm-10 columna central">

                {this.renderFilterBar()}

                {this.state.items == null &&
                    <p>{/*Carregant dades...*/}</p>
                }

                {this.state.items != null && this.state.items.length == 0 &&
                    <p>{window.localization['GENERAL_WIDGET_LAST_TYPOLOGY_EMPTY']}</p>
                }

                {this.state.items != null && this.state.items.length > 0 &&
                    <ul>{this.renderItems()}</ul>
                }

                {this.state.lastPage &&
                    <MoreResults
                      currPage={this.state.currPage}
                      lastPage={this.state.lastPage}
                      onChange={this.onPageChange.bind(this)}
                    />
                }
            </div>
          </div>
        </div>
      );
    }

    renderSelectedList() {

      var size = Object.keys(this.state.selectedItems).length;

      return (
        <div className="row grey selected-list-row">
          <div className="container">
            <div className="col-xs-12 col-sm-offset-1 col-sm-10 columna central">

              <h2>{window.localization['GENERAL_WIDGET_SELECTED_TITLE']}</h2>

              {size == 0 &&
                  <p className="empty-selection-title">{window.localization['GENERAL_WIDGET_SELECTED_VOID']}</p>
              }

              {size > 0 &&
                  <div className="selected-list-wrapper">
                    <div className="selected-list">
                      <ul>{this.renderSelectedItems()}</ul>
                    </div>
                    <div className="centered form-button-wrapper">
                      <button type="button" className="btn" onClick={this.onOpenForm.bind(this)}>{window.localization['GENERAL_WIDGET_OPEN_FORM']}</button>
                    </div>
                  </div>
              }
            </div>
          </div>
        </div>
      );
    }

    onOpenForm(event) {
      event.preventDefault();

      this.setState({
        displayModal : true
      });
    }

    handleModalClose() {
      this.setState({
        displayModal : false
      });
    }

    handleFormSubmited() {
      this.setState({
        displayModal : false,
        displayThanks : true
      });
    }

    handleThanksClose() {

      this.setState({
        displayThanks : false,
        selectedItems : {},
        area : true
      });

      $("#selected-items #number").html(0);
    }

    render() {

        const area = this.state.area;



        return (
            <div>

              <ModalFormWithSelection
                csrf_token={this.props.csrf_token}
                display={this.state.displayModal}
                onModalClose={this.handleModalClose.bind(this)}
                items={this.state.selectedItems}
                typology={this.state.typology}
                onSubmitSuccess={this.handleFormSubmited.bind(this)}
              />

              <ModalThanks
                id="modal-thanks-selection"
                display={this.state.displayThanks}
                onModalClose={this.handleThanksClose.bind(this)}
              />

              {this.renderSelectionArea()}

              {this.renderSelectedList()}

            </div>
        );
    }
}

if (document.getElementById('typology-selection-filters')) {

    document.querySelectorAll('[id=typology-selection-filters]').forEach( element => {

      var field = element.getAttribute('field');

      ReactDOM.render(<TypologySelectionFilters
          field={field}
        />, element);
    });
}
