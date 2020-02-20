import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class FormComponentTemp extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {

        return (
            <div>
                FormComponentTemp.js
            </div>
          );
    }
}

if (document.getElementById('elementFormTemp')) {
    ReactDOM.render(<FormComponentTemp/>, document.getElementById('elementFormTemp'));
}
