import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class FileComponentTemp extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {

        return (
            <div>
                FileComponentTemp.js
            </div>
          );
    }
}

if (document.getElementById('elementFileTemp')) {
    ReactDOM.render(<FormComponentTemp/>, document.getElementById('elementFileTemp'));
}


