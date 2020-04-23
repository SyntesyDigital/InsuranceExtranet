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

export default class TableDocument extends Component {

    constructor(props)
    {
        super(props);

        const field = props.field ? JSON.parse(atob(props.field)) : '';
        const elementObject = props.elementObject ? JSON.parse(atob(props.elementObject)) : null;
        const model = props.model ? JSON.parse(atob(props.model)) : null;
        const pagination =  props.pagination ? true : false;
        const itemsPerPage = props.itemsPerPage !== undefined
          && props.itemsPerPage != null
          && props.itemsPerPage != '' ? props.itemsPerPage : 10;

        const maxItems = props.maxItems !== undefined ? props.maxItems : false;
        const columns = props.columns  !== undefined ? props.columns : 'col-1';

        var pageLimit = pagination ? itemsPerPage : maxItems;

        this.state = {
            field : field,
            elementObject : elementObject,
            data:[],
            columns:columns,
            pagination : pagination,
            itemsPerPage : itemsPerPage,
            maxItems :  maxItems,
            filters : [],
            currPage:1,
            modelValuesPaginated:[],
            loading : true,
            filterable : false,
            sortColumnName: null,
            sortColumnType:null,
            model : model,

            pageLimit : pageLimit,
            currentPage : 2,
            totalPages : 0,
            dataProcessing : []
        };
    }

    componentDidMount() {

        this.processInfo();
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
          elementObject,maxItems, pageLimit
        } = this.state;

        var params = this.getQueryParams(pageLimit,1);

        //add url params
        if(this.props.parameters != '')
          params += "&"+this.props.parameters;

        axios.get(ASSETS+'architect/extranet/'+elementObject.id+'/model_values/data/'+pageLimit+params)
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
                });


              }

          }).catch(function (error) {
             console.log(error);
             self.setState({
               loading: false
             });
           });
    }

    loadMore(e){
      e.preventDefault();
      const {
        elementObject,totalPages,currentPage,
        pageLimit
      } = this.state;

      if(currentPage > totalPages){
        //process data and add to main data
        this.setState({
          loading : false
        })
      }
      else {
        //process page
        var params = this.getQueryParams(pageLimit,currentPage);
        var self = this;

        axios.get(ASSETS+'architect/extranet/'+elementObject.id+'/model_values/data/'+pageLimit+params)
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
                    loading : false
                });
              }

          }).catch(function (error) {
             console.log(error);
             self.setState({
               loading: false
             });
           });
      }

    }




    processInfo() {

        const {elementObject} = this.state;

        var anySearchable = false;
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
        }
        this.setState({
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


    renderField(value,field) {

      if(field.type == "date") {
          if(value !== undefined && value != "" && null !== value){

            if(field.settings !== undefined && field.settings.format !== undefined){
              switch(field.settings.format) {
                case 'day_month_year':
                  value = moment.unix(value).format('DD/MM/YYYY');
                  break;
                case 'day_month_year_2':
                  value = moment.unix(value).format('DD-MM-YYYY');
                  break;
                case 'month_year':
                  value = moment.unix(value).format('MM/YYYY');
                  break;
                case 'year':
                  value = moment.unix(value).format('YYYY');
                  break;
              }
            }else{
              value = moment.unix(value).format('DD/MM/YYYY')
            }
          }else{
            value = '';
          }
      }
      if(field.type == "number") {
          //console.log("renderCell => ",field,row);
          if(value !== undefined && value != ""){

            if(field.settings !== undefined && field.settings.format !== undefined){
              switch(field.settings.format) {
                case 'price':
                  value = parseFloat(value).toFixed(0) + '€';
                case 'price_with_decimals':
                  value = parseFloat(value).toFixed(2) + '€';
              }
            }
          }
      }


      if(field.type == "file"){
        return <div dangerouslySetInnerHTML={{__html: value}} />
      }

      return value;


    }

    renderItem(item) {

      var result = [];
      const {elementObject} = this.state;
      for(var key in elementObject.fields){
       // console.log("TypologyPaginated => ",items[key]);
        var identifier =  elementObject.fields[key].identifier
        if(elementObject.fields[key].type == 'file'){
          result.push(
            <div className="field-container" key={key}>
                <div className="col-md-12 field-name">{item[identifier],elementObject.fields[key].name} :</div>
                <div className="col-md-12">
                  {this.renderField(item[identifier],elementObject.fields[key])}
                </div>
            </div>
          );
        }else{
          result.push(

              <div className="field-container" key={key}>
                  <div className="col-lg-2 col-md-3 col-sm-6 field-name">{item[identifier],elementObject.fields[key].name} :</div>
                  <div className="col-lg-10 col-md-9 col-sm-6">
                    {this.renderField(item[identifier],elementObject.fields[key])}
                  </div>
              </div>
          );
        }

      }

      return (
          <div>
                  {result}
          </div>
        );
      }

    renderItems() {

      var result = [];
      const {data} = this.state;
      for(var key in data){
       // console.log("TypologyPaginated => ",items[key]);

        result.push(
          <div className={this.state.columns}>

            <div className="item-container"  key={key}>
                {this.renderItem(data[key])}
            </div>
          </div>
        );
      }

      return (
          <div className="row">
            {result}
          </div>
        );
      }


    renderTable() {
      const {data, elementObject, maxItems, currentPage, totalPages} = this.state;

      return (
        <div>
          { data == null &&
              <p>{/*Carregant dades...*/}</p>
          }

          {data != null && data.length == 0 &&
              <p>Il n'y a element aucun</p>
          }

          {data != null && data.length > 0 &&

                <div className="documentsContainer">
                  {this.renderItems()}

                </div>
          }
          {currentPage <= totalPages &&  !this.state.loading &&

            <div className="more">
              <a href="#" onClick={(e) => this.loadMore(e)}> LOAD MORE</a>
            </div>
          }
        </div>

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

if (document.getElementById('tableDocument')) {

   document.querySelectorAll('[id=tableDocument]').forEach(function(element){
       var field = element.getAttribute('field');
       var elementObject = element.getAttribute('elementObject');
       var model = element.getAttribute('model');
       var maxItems = element.getAttribute('maxItems');
       var pagination = element.getAttribute('pagination');
       var itemsPerPage = element.getAttribute('itemsPerPage');
       var parameters = element.getAttribute('parameters');
       var columns = element.getAttribute('columns');

       ReactDOM.render(<TableDocument
           field={field}
           elementObject={elementObject}
           model={model}
           pagination={pagination}
           itemsPerPage={itemsPerPage}
           maxItems={maxItems}
           columns={columns}
           parameters={parameters}
         />, element);
   });
}
