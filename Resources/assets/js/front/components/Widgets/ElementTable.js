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

export default class ElementTable extends Component {

    constructor(props)
    {
        super(props);

        const defaultDataLoadStep = 1000;
        const field = props.field ? JSON.parse(atob(props.field)) : '';
        const elementObject = props.elementObject ? JSON.parse(atob(props.elementObject)) : null;
        const model = props.model ? JSON.parse(atob(props.model)) : null;
        const pagination =  props.pagination ? true : false;
        const itemsPerPage = props.itemsPerPage !== undefined
          && props.itemsPerPage != null
          && props.itemsPerPage != '' ? props.itemsPerPage : 10;

        //console.log("props.itemsPerPage => ",props.itemsPerPage);
        //console.log("itemsPerPage => ",itemsPerPage);


        const maxItems = props.maxItems !== undefined ? props.maxItems : false;

        var pageLimit = maxItems && maxItems < defaultDataLoadStep? maxItems : defaultDataLoadStep;

        this.state = {
            field : field,
            elementObject : elementObject,
            data:[],
            columns:[],
            pagination : pagination,
            itemsPerPage : itemsPerPage,
            maxItems :  maxItems,
            filters : [],
            currPage:1,
            modelValuesPaginated:[],
            loading : true,
            loadingData : true,
            filterable : false,
            sortColumnName: null,
            sortColumnType:null,
            defaultDataLoadStep:defaultDataLoadStep,
            model : model,

            pageLimit : pageLimit,
            currentPage : 2,
            totalPages : 0,
            dataProcessing : []
        };
    }

    componentDidMount() {

        this.processColumns();
      //  this.query();
    }

    getQueryParams(limit,page) {
      var params = '?';

      if(this.state.model.DEF1 != null)
        params+= this.state.model.DEF1+"&";

      params += 'perPage='+limit+'&page='+page;

      //console.log('SORT',this.state.sortColumnName);
      if( this.state.sortColumnName){
        params += '&orderBy='+this.state.sortColumnName+'&orderType='+this.state.sortColumnType;
      }

      return params;
    }

    query() {
        var self = this;
        const {
          elementObject,itemsPerPage,maxItems,
          defaultDataLoadStep, pageLimit
        } = this.state;

        var params = this.getQueryParams(pageLimit,1);

        //add url params
        if(this.props.parameters != '')
          params += "&"+this.props.parameters;

        axios.get(ASSETS+'architect/extranet/'+elementObject.id+'/model_values/data/'+pageLimit+'/'+params)
          .then(function (response) {
              if(response.status == 200
                  && response.data.modelValues !== undefined)
              {
                //console.log("ModelValues  :: componentDidMount => ",response.data.modelValues);
                console.log("CompleteObject  :: componentDidMount => ",response.data.totalPage);
                // en completeObject rengo el total de registros, por pagina, pagina, total de paginas, desde y hasta

                var dataProcessed = self.processData(response.data.modelValues);



                self.setState({
                    data : [...self.state.data, ...dataProcessed ],
                    totalPages : response.data.totalPage,
                    loading : false
                }, function(){
                    if(!maxItems) {
                      self.iterateAllPages();
                    }
                });

              }

          }).catch(function (error) {
             console.log(error);
             self.setState({
               loading: false
             });
           });
    }

    iterateAllPages(){

      const {
        elementObject,totalPages,currentPage,
        pageLimit
      } = this.state;

      if(currentPage > totalPages){

        //process data and add to main data
        this.setState({
          loadingData : true
        })
      }
      else {

        //process page
        var params = this.getQueryParams(pageLimit,currentPage);
        var self = this;

        axios.get(ASSETS+'architect/extranet/'+elementObject.id+'/model_values/data/'+pageLimit+'/'+params)
          .then(function (response) {
              if(response.status == 200
                  && response.data.modelValues !== undefined)
              {
                const {currentPage} = self.state;
                //add data to
                var dataProcessed = self.processData(response.data.modelValues);

                self.setState({
                    data : [...self.state.data, ...dataProcessed ],
                    currentPage : currentPage + 1,
                    loadingData : true
                }, function(){
                    self.iterateAllPages();
                });

              }

          }).catch(function (error) {
             console.log(error);
             self.setState({
               loadingData: false
             });
           });
      }

    }

    renderCell(field,identifier,row) {

      var value = row.original[identifier];

      if(field.type == "date") {
          //console.log("renderCell => ",field,row);
          if(row.original[identifier] !== undefined && row.original[identifier] != ""){

            if(field.settings !== undefined && field.settings.format !== undefined){
              switch(field.settings.format) {
                case 'day_month_year':
                  value = moment.unix(row.original[identifier]).format('DD/MM/YYYY')
                case 'month_year':
                  value = moment.unix(row.original[identifier]).format('MM/YYYY')
                case 'year':
                  value = moment.unix(row.original[identifier]).format('YYYY')
              }

            }

            value = moment.unix(row.original[identifier]).format('DD/MM/YYYY')
          }
      }
      if(field.type == "number") {
          //console.log("renderCell => ",field,row);
          if(row.original[identifier] !== undefined && row.original[identifier] != ""){

            if(field.settings !== undefined && field.settings.format !== undefined){
              switch(field.settings.format) {
                case 'price':
                  value = parseFloat(row.original[identifier]).toFixed(0) + '€';
                case 'price_with_decimals':
                  value = parseFloat(row.original[identifier]).toFixed(2) + '€';
              }
            }
          }
      }

      if(field.type == "file"){
        //console.log("Field with has Route => ",field,row.original);
        return <div dangerouslySetInnerHTML={{__html: row.original[identifier]}} />
      }
      else if(field.settings.hasRoute !== undefined && field.settings.hasRoute != null){

        //console.log("Field with has Route => ",field,row.original);
        return <div dangerouslySetInnerHTML={{__html: row.original[identifier+"_url"]}} />
      }
      else {
        return value;
      }

    }

    processColumns() {

        const {elementObject} = this.state;

        var anySearchable = false;
        var columns = [];
        var sortColumnName = null;
        var sortColumnType = null;

        for(var index in elementObject.fields){
          if(elementObject.fields[index].rules.searchable && ! anySearchable){
            anySearchable = true;
          }

          var identifier = elementObject.fields[index].identifier.replace('.','');
          if(elementObject.fields[index].rules.sortableByDefault){
                sortColumnName  = identifier;
                sortColumnType = elementObject.fields[index].rules.sortableByDefault;
          }

          columns.push({
            accessor : identifier,
            Header: elementObject.fields[index].name,
            sortable: elementObject.fields[index].rules.sortable,
            filterable:  elementObject.fields[index].rules.searchable,
            filterMethod: this.filterMethod.bind(this,identifier),
            filterAll: true,
            Cell: this.renderCell.bind(this,elementObject.fields[index],identifier)
          });
        }

        this.setState({
            columns : columns,
            filterable : anySearchable,
            sortColumnName :sortColumnName,
            sortColumnType : sortColumnType
        }, this.query.bind(this)
      );
    }

    processData(data){

        for(var key in data){
          for( var subkey in data[key]){
            //remove . on keys to allow filter
            var newSubkey = subkey.replace('.','');
            var dataValue = data[key][subkey];

            //if value has ';' that means it has a link
            //console.log("dataValue => ",dataValue);
            if(typeof dataValue === 'string' && dataValue.indexOf(';') != -1){
              //console.log("data => ",data[key],newSubkey,dataValue);
              //dataValue =
              var valueArray = dataValue.split(';');
              data[key][newSubkey+'_url'] = valueArray[1];
              dataValue = valueArray[0];
            }

            data[key][newSubkey] = dataValue;
          }
        }

        return data;
    }

    filterMethod(identifier, filter, rows ) {
        //console.log("identifier => ",identifier);
        return matchSorter(rows, filter.value, { keys: [identifier] });
    }

    renderTable() {
      const {data, elementObject, itemsPerPage,maxItems} = this.state;

      return (
        <ReactTable
          data={this.state.data}
          columns={this.state.columns}
          showPagination={this.state.pagination}
          defaultSorted={[
            {
              id: this.state.sortColumnName,
              desc: this.state.sortColumnType == 'DESC'?true:false
            }
          ]}
          defaultPageSize={maxItems ? parseInt(maxItems) : parseInt(this.state.itemsPerPage)}
          loading={this.state.loading}
          filterable={true}
          //className="-striped -highlight"
          className=""
          previousText={<span><i className="fa fa-caret-left"></i> &nbsp; Précédente</span>}
          nextText={<span>Suivante &nbsp; <i className="fa fa-caret-right"></i></span>}
          loadingText={'Chargement...'}
          noDataText={'Aucune donnée trouvée'}
          pageText={'Page'}
          ofText={'de'}
          rowsText={'lignes'}
        />
      );
    }

    render() {
        return (
            <div>
              {this.renderTable()}
            </div>

        );

    }
}

if (document.getElementById('elementTable')) {

   document.querySelectorAll('[id=elementTable]').forEach(function(element){
       var field = element.getAttribute('field');
       var elementObject = element.getAttribute('elementObject');
       var model = element.getAttribute('model');
       var maxItems = element.getAttribute('maxItems');
       var pagination = element.getAttribute('pagination');
       var itemsPerPage = element.getAttribute('itemsPerPage');
       var parameters = element.getAttribute('parameters');

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
