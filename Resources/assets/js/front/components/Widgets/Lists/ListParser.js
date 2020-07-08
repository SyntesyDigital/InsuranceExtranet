import React, { Component } from 'react';

String.prototype.replaceHtmlEntites = function() {
  var s = this;
  var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  var translate = {"nbsp": " ","amp" : "&","quot": "\"","lt"  : "<","gt"  : ">"};
  return ( s.replace(translate_re, function(match, entity) {
    return translate[entity];
  }) );
  };

export default class ListParser extends Component {

    constructor(props)
    {
        super(props);

        const field = props.field ? JSON.parse(atob(props.field)) : '';
        const elementObject = props.elementObject ? JSON.parse(atob(props.elementObject)) : null;
        const model = props.model ? JSON.parse(atob(props.model)) : null;
        const pagination =  props.pagination ? true : false;
        const itemsPerPage = props.itemsPerPage !== undefined
          && props.itemsPerPage != null
          && props.itemsPerPage != '' ? props.itemsPerPage : 4;

        const columns = props.columns  !== undefined ? props.columns : 'col-1';

        var pageLimit = itemsPerPage;

        this.state = {
            field : field,
            elementObject : elementObject,
            data:[],
            columns:columns,
            pagination : pagination,
            itemsPerPage : itemsPerPage,
            filters : [],
            currPage:1,
            modelValuesPaginated:[],
            initiliased : false,
            loading : true,
            filterable : false,
            sortColumnName: null,
            sortColumnType:null,
            model : model,

            pageLimit : pageLimit,
            currentPage : 1,  //load more starts at 2
            totalPages : 0,
            dataProcessing : [],

            firstLoad : true
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
          elementObject, pageLimit,currentPage
        } = this.state;

        var params = this.getQueryParams(pageLimit,currentPage);

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

                if(self.state.firstLoad && self.props.onFirstLoad !== undefined){
                  self.props.onFirstLoad(dataProcessed);
                }

                self.setState({
                    data : [...self.state.data, ...dataProcessed ],
                    totalPages : response.data.totalPage,
                    currentPage : currentPage + 1,
                    loading : false,
                    initiliased : true,
                    firstLoad : false
                });

              }

          }).catch(function (error) {
             console.log(error);
             self.setState({
               loading: false,
               initiliased : true
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

        //add url params
        if(this.props.parameters != '')
          params += "&"+this.props.parameters;
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
            if(typeof dataValue === 'string'){

              dataValue = dataValue.replaceHtmlEntites();
              
              if(dataValue.indexOf(';') != -1){
                //console.log("data => ",data[key],newSubkey,dataValue);
                //dataValue =
                var valueArray = dataValue.split(';');
                data[key][newSubkey+'_url'] = valueArray[1];
                dataValue = valueArray[0];
              }
            }

            data[key][newSubkey] = dataValue;
          }
        }

        return data;
    }

    renderItems(data) {

      var result = [];
      for(var key in data){
       // console.log("TypologyPaginated => ",items[key]);

        result.push(
          <div className={this.state.columns + ' ' + (this.props.identifier ? this.props.identifier : '')} key={key}>
            <div className="item-container">
                {this.props.renderItem(data[key],this.state.elementObject,key)}
            </div>
          </div>
        );
      }

      if(this.props.onReverse == true){
        result.reverse();
      }
      
      return (
          <div className="row">
            {result}
          </div>
        );
    }

    renderTable() {
      const {data, currentPage, totalPages,initiliased} = this.state;

      var externalLoading = this.props.externalLoading !== undefined 
        ? this.props.externalLoading 
        : false ;
      var loaded = initiliased && !externalLoading;

      return (
        
        <div className={this.props.customClass ? this.props.customClass : ''}>
          {loaded && this.props.onReverse && currentPage <= totalPages &&
            <div className="more-btn">
              <a href="#" onClick={(e) => this.loadMore(e)}> 
                <i className="far fa-arrow-alt-circle-down"></i>
                &nbsp;
                Voire plus 
              </a>
            </div>
          }
          { !loaded &&
              <p className="message">Chargement...</p>
          }

          {loaded && data != null && data.length == 0 &&
              <p className="message">Aucune donnée trouvée</p>
          }

          {loaded && data != null && data.length > 0 &&

                <div className="documents-container">
                  {this.renderItems(data)}
                </div>
          }
          {loaded && !this.props.onReverse && currentPage <= totalPages &&
            <div className="more-btn">
              <a href="#" onClick={(e) => this.loadMore(e)}> 
                <i className="far fa-arrow-alt-circle-down"></i>
                &nbsp;
                Voire plus 
              </a>
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
