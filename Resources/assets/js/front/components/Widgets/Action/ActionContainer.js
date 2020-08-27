import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SimpleButton from '../SimpleButton';

export default class ActionContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SimpleButton
                field={this.props.field}
                parameters={this.props.parameters}
            />
        );
    }
}

if (document.getElementById('simpleButton')) {
    document.querySelectorAll('[id=simpleButton]').forEach(function (element) {
        var field = JSON.parse(atob(element.getAttribute('field')));
        const props = Object.assign({}, element.dataset);
        ReactDOM.render(<SimpleButton
            field={field}
            {...props}
        />, element);
    });
}



