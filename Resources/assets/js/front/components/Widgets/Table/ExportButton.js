import React, { Component } from 'react';

import moment from 'moment';

export default class ExportButton extends Component {

    constructor(props)
    {
        super(props);
        
        this.state = {
          filename : "",
          exportPage: 1,
          downloading : false
        };
    }

    handleExport(e) {
      e.preventDefault();
      var event = e;

      const {
        downloadUrl,
        elementObject,
        totalPages,
        pageLimit
      } = this.props;

      const {
        filename,
        exportPage
      } = this.state;

      //if no data nothing to do
      if(totalPages == null)
        return ;

      if(exportPage > totalPages){
        var url = downloadUrl.replace(':filename',filename);
        console.log('ExportButton :: peticion terminada (url,filename)', url,filename);

        this.setState({
          downloading: false
        });
      
        console.log("ExportButton ::  download url : (url)",url)
        //window.location.href=url;

      }else{
        var self = this;
          self.setState({
            downloading: true
          });
          var params = this.props.getQueryParams(pageLimit,exportPage);
          var self = this;
          axios.get(ASSETS+'architect/extranet/export/'+elementObject.id+'/'+filename+'/model_values/data/'+pageLimit+'/'+params).then(function (response) {
            self.setState({
                filename : response.data.filename,
                exportPage : exportPage + 1,
                downloading : true
              }, function(){
                self.export(event);
            });
            
          }).catch(function (error) {
            self.setState({
              downloading: false
            });
          });
      }
    }
    
    render() {

        return (
          <div className="excel-btn">
            <a href="#" onClick={this.handleExport.bind(this)} className={"disabled"}>
              <i className="fas fa-download"></i>Exportation CSV
            </a>
          </div>

        );

    }
}
