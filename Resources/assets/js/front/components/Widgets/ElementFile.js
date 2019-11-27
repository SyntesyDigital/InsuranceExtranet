import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FileComponent from './File/FileComponent';

export default class ElementFile extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <FileComponent
              elementObject={this.props.elementObject}
              model={this.props.model}
              doubleColumn={this.props.doubleColumn}
              parameters={this.props.parameters}
            />
        );
    }
}

if (document.getElementById('elementFile')) {

   document.querySelectorAll('[id=elementFile]').forEach(function(element){
       var field = element.getAttribute('field');
       var elementObject = JSON.parse(atob(element.getAttribute('elementObject')));
       var model = JSON.parse(atob(element.getAttribute('model')));
       var doubleColumn = element.getAttribute('doubleColumn');
       var parameters = element.getAttribute('parameters');

       ReactDOM.render(<ElementFile
           field={field}
           elementObject={elementObject}
           model={model}
           doubleColumn={doubleColumn}
           parameters={parameters}
         />, element);
   });
}
