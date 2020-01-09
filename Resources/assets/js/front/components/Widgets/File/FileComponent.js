import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class FileComponent extends Component {

    constructor(props)
    {
        super(props);

        //const field = props.field ? JSON.parse(atob(props.field)) : '';
        const doubleColumn = props.doubleColumn ? props.doubleColumn : false;

        this.state = {
            //field : field,
            elementObject : props.elementObject,
            doubleColumn:doubleColumn,
            modelValues:[],
            model : props.model
        };
    }

    componentDidMount() {
      this.query();
    }

    getUrlParameters() {
      //concat parameters, first constant parameters
      var parameters = this.state.model.DEF1 != null ?
        this.state.model.DEF1 : '';

      if(parameters != '')
        parameters += "&";

      //then
      parameters += this.props.parameters;

      return parameters;
    }

    query(page,filters) {

        var self = this;
        const {elementObject} = this.state;
        const parameters = this.getUrlParameters();

        //console.log(ASSETS+'architect/extranet/'+elementObject.id+'/model_values/data?'+this.props.parameters);
        axios.get(ASSETS+'architect/extranet/'+elementObject.id+'/model_values/data?'+parameters)
          .then(function (response) {
              if(response.status == 200
                  && response.data.modelValues !== undefined)
              {
                console.log("ModelValues :: componentDidMount => ",response.data.modelValues);

                self.setState({
                  modelValues : response.data.modelValues
                });
              }

          }).catch(function (error) {
             console.log(error);
           });
    }

    renderItems() {
      const {modelValues, elementObject, doubleColumn} = this.state;
      var result = [];
      var numTotalFields = parseInt(elementObject.fields.length);
      for(var key in modelValues){

        if(doubleColumn){
          numTotalFields = 0;
          for(var i in elementObject.fields){
            if(modelValues[key][elementObject.fields[i].identifier] !== null && modelValues[key][elementObject.fields[i].identifier] != ''){
                numTotalFields++;
            }
          }
          result.push(
              <div className="col-md-6">
                {this.renderItemsColumn(1,key,numTotalFields)}
              </div>
            );

          result.push(
              <div className="col-md-6">
                {this.renderItemsColumn(2,key,numTotalFields)}
              </div>
            );

        }else{
          result.push(
              <div className="col-md-12">
                  {this.renderItemsColumn(0,key,numTotalFields)}
              </div>
            );
        }

      }

      return result;
    }

    renderItemsColumn(column,key,numTotalFields){
      const {modelValues, elementObject} = this.state;



      var numFieldsFirstColumn = numTotalFields/2;
      var columnRows = [];

      var index = 0;
      for(var i in elementObject.fields){

        var field = elementObject.fields[i];

        var hasRoute = field.settings.hasRoute !== undefined && field.settings.hasRoute != null ? true : false;
        if(modelValues[key][elementObject.fields[i].identifier] !== null && modelValues[key][elementObject.fields[i].identifier] != ''){

          if(column == 1 && index < numFieldsFirstColumn){
            columnRows.push(
              this.renderField(
                elementObject.fields[i].name,
                modelValues[key][elementObject.fields[i].identifier],
                hasRoute
              )
            );
          }

          if(column == 2 && index >= numFieldsFirstColumn){
            columnRows.push(
              this.renderField(
                elementObject.fields[i].name,
                modelValues[key][elementObject.fields[i].identifier],
                hasRoute
              )
            );
          }

          if(column == 0){
            columnRows.push(
              this.renderField(
                elementObject.fields[i].name,
                modelValues[key][elementObject.fields[i].identifier],
                hasRoute
              )
            );
          }
          index++;
        }
      }
      return columnRows;
    }

    renderField(name, value, hasRoute){
      return (<div className="element-file-input-container">
                <div className="col-xs-6 col-md-4 element-file-title">
                  {name}
                </div>

                <div className="col-xs-6 col-md-8 element-file-content"
                  dangerouslySetInnerHTML={{__html: value}}
                >
                </div>


                <div  />
              </div>);
    }

    render() {
        return (
            <div className="row file-component">
              {this.renderItems()}
            </div>
        );
    }
}
