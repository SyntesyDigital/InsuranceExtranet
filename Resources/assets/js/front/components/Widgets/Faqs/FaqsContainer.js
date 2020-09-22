import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Faqs from './Faqs';

export default class FaqsContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Faqs
                field={this.props.field}
                parameters={this.props.parameters}
            />
        );
    }
}

if (document.getElementById('faqs')) {
    document.querySelectorAll('[id=faqs]').forEach(function (element) {
        var field = JSON.parse(atob(element.getAttribute('field')));
        const props = Object.assign({}, element.dataset);
        ReactDOM.render(<FaqsContainer
            field={field}
            {...props}
        />, element);
    });
}



