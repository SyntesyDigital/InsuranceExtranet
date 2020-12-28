import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment-timezone/builds/moment-timezone-with-data';
moment.tz.setDefault('Europe/Berlin');

import ListParser from '../ListParser';

import FormDropZone from './../../Forms/Form/FormDropZone/FormDropZone';

export default class MissingDocuments extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            firstLoad : true,
            loadingForm: true,
            formModel: null
        };
    }

    loadElement(data) {

      if(data.length == 0)
        return;

      var url = null;
      for(var key in data[0]){
        if(key.indexOf("_url") != -1){
          //is url
          url = data[0][key];
        }
      }

      if(url == null || url == ""){
        console.error("MissingDocuments :: url not defined in element");
        return;
      }

      var modelId = url.split("?");
      modelId = modelId[0];

      var self = this;

      axios.get(ASSETS+'/architect/extranet/element-modal/'+modelId)
        .then(function(response) {
            if(response.status == 200
                && response.data !== undefined)
            {
              console.log("ModalTable :: data => ",response.data);

              self.setState({
                formModel : response.data.model,
                formElement : response.data.element,
                loadingForm : false
              });

            }
        }).catch(function (error) {
           console.log(error);
         });
    }

    numberFormat (number, decimals, dec_point, thousands_sep) {
      // Strip all characters but numerical ones.
      number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
      var n = !isFinite(+number) ? 0 : +number,
          prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
          sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
          dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
          s = '',
          toFixedFix = function (n, prec) {
              var k = Math.pow(10, prec);
              return '' + Math.round(n * k) / k;
          };
      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
      s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
      if (s[0].length > 3) {
          s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }
      if ((s[1] || '').length < prec) {
          s[1] = s[1] || '';
          s[1] += new Array(prec - s[1].length + 1).join('0');
      }
      return s.join(dec);
    }

    parseNumber(value,field) {

      if(value !== undefined && value != ""){

        var hideCurrency = field.settings.hideCurrency !== undefined 
          ? field.settings.hideCurrency : false;

        var currency = hideCurrency ? "" : "€";

        if(field.settings !== undefined && field.settings.format !== undefined){
          switch(field.settings.format) {
            case 'price':
              value = this.numberFormat(value, 0, ',', '.') + currency;
              break;
            case 'price_with_decimals':
              value = this.numberFormat(value, 2, ',', '.') + currency;
              break;
            case 'price_with_decimals_2':
              value = this.numberFormat(value, 2, '.', ' ') + currency;
              break;
          }
        }
      }
      
      return value;

    }

    renderField(value,field) {
        console.log("renderFIeld :. " ,value,field)

      if(field.type == "date") {
          if(value !== undefined && value != "" && null !== value){

            if(field.settings !== undefined && field.settings.format !== undefined && field.settings.format != null){
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
          value = this.parseNumber(value,field);
      }

      return value;
      
    }

    renderItem(item,elementObject,key) {

      var element = null;
      var infos = [];
      
      //console.log("renderItem :: elementObject ",elementObject);
      //render missing document
      for(var key in elementObject.fields){
       // console.log("TypologyPaginated => ",items[key]);
        var identifier =  elementObject.fields[key].identifier

        if(elementObject.fields[key].settings.hasModal !== undefined && elementObject.fields[key].settings.hasModal != null){
          //is the element info
          //console.log("MissingDocument :: item info => (item,indentifier)",item,identifier);
          element = {
            field : elementObject.fields[key],
            url : item[identifier.replace('.','')+"_url"]
          }
        }
        else if(elementObject.fields[key].type == 'text'){
          infos.push(
              <p key={key}>
                {this.renderField(item[identifier],elementObject.fields[key])}
              </p>
            );
        }
        
      }

      if(element == null){
        console.error("MissingDocuments :: element field not defined.")
        return null;
      }

      var elementUrlArray = element.url.split('?');
      var modelId = elementUrlArray[0];
      var parametersObject = elementUrlArray[1].split(':');
      parametersObject = parametersObject[0];

      return <FormDropZone 
          label={infos}
          elementObject={this.state.formElement}
          modelId={this.state.formModel.ID}
          parametersObject={parametersObject}
          field={element.field}
          id={key}
          onFormFinished={this.handleFormFinished.bind(this,item)}
        />

    }

    handleFormFinished(item) {
      console.log("MissingDocuments :: handleFormFinished ",item);
    }

    handleFirstLoad(dataProcessed) {
      this.loadElement(dataProcessed);
    }

    render() {
        return (
          <div>
            <ListParser
              customClass={'missing-documents-component'}
              externalLoading={this.state.loadingForm}
              field={this.props.field}
              elementObject={this.props.elementObject}
              model={this.props.model}
              pagination={this.props.pagination}
              itemsPerPage={this.props.itemsPerPage}
              columns={this.props.columns}
              parameters={this.props.parameters}
              renderItem={this.renderItem.bind(this)}
              onFirstLoad={this.handleFirstLoad.bind(this)}
            />
          </div>

        );

    }
}

if (document.getElementById('missing-documents')) {

   document.querySelectorAll('[id=missing-documents]').forEach(function(element){
       var field = element.getAttribute('field');
       var elementObject = element.getAttribute('elementObject');
       var model = element.getAttribute('model');
       var itemsPerPage = element.getAttribute('itemsPerPage');
       var parameters = element.getAttribute('parameters');
       var columns = element.getAttribute('columns');

       ReactDOM.render(<MissingDocuments
           field={field}
           elementObject={elementObject}
           model={model}
           itemsPerPage={itemsPerPage}
           columns={columns}
           parameters={parameters}
         />, element);
   });
}
