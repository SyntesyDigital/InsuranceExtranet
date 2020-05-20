import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ImageTextLink from './ImageTextLink';
export default class ImageTextLinkContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ImageTextLink
                field={this.props.field}
            />
        );
    }
}

if (document.getElementById('imageTextLink')) {
    document.querySelectorAll('[id=imageTextLink]').forEach(function (element) {
        var field = JSON.parse(atob(element.getAttribute('field')));
        const propsContainer = document.getElementById("imageTextLink");
        const props = Object.assign({}, propsContainer.dataset);
        ReactDOM.render(<ImageTextLinkContainer
            field={field}
            {...props}
        />, element);
    });
}



