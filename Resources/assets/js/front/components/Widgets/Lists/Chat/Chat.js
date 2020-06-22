import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ListParser from '../ListParser';

import {
  parseNumber,
  parseDate,
  getConditionalFormating,
  hasConditionalFormatting
} from '../../functions';

export default class Chat extends Component {

    constructor(props) {
        super(props);
    }

    hasConditionalFormatting(conditionalFormatting) {
      if(conditionalFormatting.color !== undefined){
        return true;
      }
      return false;
    }

    renderField(item,identifier,field) {

      var value = item[identifier];
      var email = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(value)

      if(field.type == "date") {
          value = parseDate(value,field);
          return <div className={'has-date'} dangerouslySetInnerHTML={{__html: value}} />
      }
      else if(field.type == "number") {
          value = parseNumber(value,field);
      }
      else if(email == true) {
          return <div className={'has-mail'} dangerouslySetInnerHTML={{__html: value}} />
      } 
      
      var style = getConditionalFormating(field,value);
      var hasColor = hasConditionalFormatting(style);
      
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
        console.log("infos :: ", infos);
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
                customClass="table-chat-container"
                field={this.props.field}
                elementObject={this.props.elementObject}
                model={this.props.model}
                pagination={this.props.pagination}
                itemsPerPage={this.props.itemsPerPage}
                columns={this.props.columns}
                parameters={this.props.parameters}
                renderItem={this.renderItem.bind(this)}
                identifier={'chat-field'}
              />
            </div>

        );
    }
}

if (document.getElementById('chat-list')) {

   document.querySelectorAll('[id=chat-list]').forEach(function(element){
       var field = element.getAttribute('field');
       var elementObject = element.getAttribute('elementObject');
       var model = element.getAttribute('model');
       var itemsPerPage = element.getAttribute('itemsPerPage');
       var parameters = element.getAttribute('parameters');
       var columns = element.getAttribute('columns');

       ReactDOM.render(<Chat
           field={field}
           elementObject={elementObject}
           model={model}
           itemsPerPage={itemsPerPage}
           columns={columns}
           parameters={parameters}
         />, element);
   });
}
