import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment';
import ListParser from '../ListParser';

export default class TableList extends Component {

    constructor(props) {

        super(props);
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

    renderField(item,identifier,field) {

      var value = item[identifier];

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

      var style = {};
      var hasColor = false;
      
      if(field.settings.conditionalFormatting !== undefined && field.settings.conditionalFormatting != null) {
        style=this.getConditionalFormating(field,value);
        hasColor = this.hasConditionalFormatting(style);
      }


      if(field.type == "file"){
        return <div dangerouslySetInnerHTML={{__html: value}} />
      }
      else if(field.settings.hasRoute !== undefined && field.settings.hasRoute != null){

        return <div dangerouslySetInnerHTML={{__html: item[identifier+"_url"]}} />
      }
      else {
        return <div className={hasColor ? 'has-color' : ''} style={style} dangerouslySetInnerHTML={{__html: value}} />
      }

    }

    renderItem(item,elementObject) {

      var file = null;
      var infos = [];
      
      for(var key in elementObject.fields){
       // console.log("TypologyPaginated => ",items[key]);
        var identifier =  elementObject.fields[key].identifier
        if(elementObject.fields[key].type == 'file'){
          file = this.renderField(item,identifier,elementObject.fields[key]);
        } 
        else { 
          infos.push(
              <div className="field-container" key={key}>
                  {this.renderField(item,identifier,elementObject.fields[key])}
              </div>
          );
        }

      }

      return (
          <div>
            <div className={"file-infos-container "+(file == null ? 'no-document' : '')}>
              {file != null && 
                <div className="file-icon">
                  {file}
                </div>
              }
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
                customClass="table-list-container"
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

if (document.getElementById('table-list')) {

   document.querySelectorAll('[id=table-list]').forEach(function(element){
       var field = element.getAttribute('field');
       var elementObject = element.getAttribute('elementObject');
       var model = element.getAttribute('model');
       var itemsPerPage = element.getAttribute('itemsPerPage');
       var parameters = element.getAttribute('parameters');
       var columns = element.getAttribute('columns');

       ReactDOM.render(<TableList
           field={field}
           elementObject={elementObject}
           model={model}
           itemsPerPage={itemsPerPage}
           columns={columns}
           parameters={parameters}
         />, element);
   });
}
