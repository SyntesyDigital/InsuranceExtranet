import React, { Component } from 'react';
import { render } from 'react-dom';

import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter'

import ExportButton from './ExportButton';

import moment from 'moment';

//const selectors = Data.Selectors;

export default class TableComponent extends Component {

    constructor(props)
    {
        super(props);

        const defaultDataLoadStep = 1000;
        //const field = props.field ? JSON.parse(atob(props.field)) : '';
        const elementObject = props.elementObject;
        const model = props.model;
        const pagination =  props.pagination ? true : false;
        const itemsPerPage = props.itemsPerPage !== undefined
          && props.itemsPerPage != null
          && props.itemsPerPage != '' ? props.itemsPerPage : 10;
        const exportBtn = props.exportBtn;
        const downloadUrl = props.downloadUrl;

        const maxItems = props.maxItems !== undefined ? props.maxItems : false;

        var pageLimit = maxItems && maxItems < defaultDataLoadStep? maxItems : defaultDataLoadStep;

        this.state = {
            id : props.id,

            //field : field,
            elementObject : elementObject,
            data:[],
            columns:[],
            pagination : pagination,
            itemsPerPage : itemsPerPage,
            maxItems :  maxItems,
            filters : [],
            currPage:1,
            loading : true,
            loadingData : true,
            filterable : false,
            sortColumnName: null,
            sortColumnType:null,
            defaultDataLoadStep:defaultDataLoadStep,
            model : model,
            exportBtn:exportBtn,
            downloadUrl : props.downloadUrl,
            //iterator
            pageLimit : pageLimit,
            currentPage : 2,
            totalPages : 0,
            csvElements : 0,
            exportPage: 1
        };
    }

    refreshTable() {
      console.log("refreshTable");

      var self = this;

      this.setState({
        data:[],
        currPage:1,
        loading : true,
        loadingData : true,
        currentPage : 2,
        totalPages : 0
      },function(){
          self.query();
      })

    }

    componentDidMount() {

        this.processColumns();
        var self = this;

        console.log("TableComponent :: (id) ",('#'+this.state.id+' .modal-link'));

        $(document).on('click','#'+this.state.id+' .modal-link',function(e){

          e.preventDefault();

          var link = $(e.target).closest('.modal-link');
          var url = link.data('modal');

          console.log("TableComponent :: on click! (url) ",url);

          //url has format [element_id]?[params]:[redirect_url]
          var urlArray = url.split(":");
          var elementUrl = urlArray[0];
          var redirectUrl = urlArray[1];
          self.props.onOpenModal(elementUrl,redirectUrl);
        });
    }

    getQueryParams(limit,page) {
      var params = '?';

      if(this.state.model.DEF1 != null)
        params+= this.state.model.DEF1+"&";

      params += 'perPage='+limit+'&page='+page;

      if( this.state.sortColumnName){
        params += '&orderBy='+this.state.sortColumnName+'&orderType='+this.state.sortColumnType;
      }

      return params;
    }

    nothing(e) {
      e.preventDefault();
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
               // console.log("CompleteObject  :: componentDidMount => ",response.data.totalPage);
                // en completeObject rengo el total de registros, por pagina, pagina, total de paginas, desde y hasta

                var dataProcessed = self.processData(response.data.modelValues);

                self.setState({
                    data : [...self.state.data, ...dataProcessed ],
                    totalPages : response.data.totalPage,
                    loading : false
                }, function(){
                    if(!maxItems) {
                      self.iterateAllPages();
                    }else{
                      self.setState({
                          loadingData : false,
                      });
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
          loadingData : false
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

    getConditionalFormating(field,value) {

      value = value.toLowerCase();
      
      if(field.settings.conditionalFormatting !== undefined && 
        field.settings.conditionalFormatting != null) {
        
        for(var key in field.settings.conditionalFormatting.conditions){
          var condition = field.settings.conditionalFormatting.conditions[key];
          if(value.indexOf(condition.value.toLowerCase()) != -1) {
            //if the string is contained in the string
            return {
              color : condition.color,
              backgroundColor : condition.backgroundColor,
            };
          }
        }
      }

      return {};
    }

    hasConditionalFormatting(conditionalFormatting) {
      if(conditionalFormatting.color !== undefined){
        return true;
      }
      return false;
    }

    renderCell(field,identifier,row) {

      var value = row.original[identifier];

      if(field.type == "date") {
          //console.log("renderCell => ",field,row);
          if(row.original[identifier] !== undefined && row.original[identifier] != null && row.original[identifier] != ""){

            if(field.settings !== undefined && field.settings.format !== undefined){
             // console.log(field.settings.format)
              switch(field.settings.format) {
                case 'day_month':
                  value = moment.unix(row.original[identifier]).format('DD/MM');
                  break;
                case 'day_month_year':
                  value = moment.unix(row.original[identifier]).format('DD/MM/YYYY');
                  break;
                case 'day_month_year_2':
                  value = moment.unix(row.original[identifier]).format('DD-MM-YYYY');
                  break;
                case 'month_year':
                  value = moment.unix(row.original[identifier]).format('MM/YYYY');
                  break;
                case 'year':
                  value = moment.unix(row.original[identifier]).format('YYYY');
                  break;
                default  :
                  value = moment.unix(row.original[identifier]).format('DD/MM/YYYY');
                  break;
              }
            }
            else {
              value = moment.unix(row.original[identifier]).format('DD/MM/YYYY');
            }
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

      var style = {};
      var hasColor = false;
      
      if(field.settings.conditionalFormatting !== undefined && field.settings.conditionalFormatting != null) {
        style=this.getConditionalFormating(field,value);
        hasColor = this.hasConditionalFormatting(style);
      }

      if(field.type == "file"){
        return <div dangerouslySetInnerHTML={{__html: row.original[identifier]}} />
      }
      else if(field.settings.hasRoute !== undefined && field.settings.hasRoute != null){

        return <div dangerouslySetInnerHTML={{__html: row.original[identifier+"_url"]}} />
      }
      else if(field.settings.hasModal !== undefined && field.settings.hasModal != null){

        return <div dangerouslySetInnerHTML={{__html: '<a href="" class="modal-link" data-modal="'+(row.original[identifier+"_url"])+'">'+
          row.original[identifier]+
        '</a>'}} />
      }
      else {
        return <div className={hasColor ? 'has-color' : ''} style={style} dangerouslySetInnerHTML={{__html: value}} />
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
            if(typeof dataValue === 'string' && dataValue.indexOf(';') != -1){
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
          return matchSorter(rows, filter.value, { keys: [{
            key : identifier, 
            threshold: matchSorter.rankings.CONTAINS
          }] 
        });
    }

    renderTable() {
      const {data, elementObject, itemsPerPage,maxItems, downloading, loadingData} = this.state;

      return (
        <div id={this.state.id}>
          {this.props.exportBtn &&

            <ExportButton
              disabled={loadingData}
              downloadUrl={this.props.downloadUrl}
              elementObject={this.state.elementObject}
              totalPages={this.state.totalPages}
              pageLimit={this.state.pageLimit}
              getQueryParams={this.getQueryParams.bind(this)}
            />
          }

          <div className={this.props.exportBtn? 'react-table-container m-top':'react-table-container'}>
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
          </div>
          
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
