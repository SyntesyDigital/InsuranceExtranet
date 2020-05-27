import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment';
import ListParser from '../ListParser';



export default class TableDocument extends Component {

    constructor(props)
    {
        super(props);
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


      if(field.type == "file"){
        return <div dangerouslySetInnerHTML={{__html: value}} />
      }

      return value;


    }

    renderItem(item,elementObject) {

      var file = null;
      var infos = [];

      for(var key in elementObject.fields){
       // console.log("TypologyPaginated => ",items[key]);
        var identifier =  elementObject.fields[key].identifier
        if(elementObject.fields[key].type == 'file'){

          file = this.renderField(item[identifier],elementObject.fields[key]);
          
        }else{
          infos.push(
              <div className="field-container" key={key}>
                  {this.renderField(item[identifier],elementObject.fields[key])}
              </div>
          );
        }

      }

      return (
          <div>
            <div className="file-contianer">
              {file}
            </div>
            <div className="file-infos-container">
              <div className="file-icon">
                <i className="far fa-file"></i>
              </div>
              <div className="file-infos">
                {infos}
              </div>
            </div>
          </div>
        );
      }

    render() {
        return (
            <div>
              <ListParser
                field={this.props.field}
                elementObject={this.props.elementObject}
                model={this.props.model}
                pagination={this.props.pagination}
                itemsPerPage={this.props.itemsPerPage}
                columns={this.props.columns}
                parameters={this.props.parameters}
                renderItem={this.renderItem.bind(this)}
              />
            </div>

        );

    }
}

if (document.getElementById('table-document')) {

   document.querySelectorAll('[id=table-document]').forEach(function(element){
       var field = element.getAttribute('field');
       var elementObject = element.getAttribute('elementObject');
       var model = element.getAttribute('model');
       var itemsPerPage = element.getAttribute('itemsPerPage');
       var parameters = element.getAttribute('parameters');
       var columns = element.getAttribute('columns');

       ReactDOM.render(<TableDocument
           field={field}
           elementObject={elementObject}
           model={model}
           itemsPerPage={itemsPerPage}
           columns={columns}
           parameters={parameters}
         />, element);
   });
}
