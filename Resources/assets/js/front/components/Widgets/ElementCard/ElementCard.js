import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Label from './fields/Label';
import CheckField from './fields/CheckField';
import IconField from './fields/IconField';
import DefaultField from './fields/DefaultField';
import ImageField from './fields/ImageField';
import RichTextField from './fields/RichTextField';
import IframeFile from './fields/IframeFile';
import { Grid, Row, Col } from 'react-bootstrap';
import api from './../../../../back/api';
import LayoutParser from './LayoutParser';
import {
    parseNumber
} from '../functions';
import {
    parameteres2Array,
    isVisible
} from '../Forms/functions';
import CardComponent from './CardComponent';

export default class ElementCard extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <CardComponent
                field={this.props.field}
                element={this.props.element}
                model={this.props.model}
                parameters={this.props.parameters}
            />
        );
    }

}


if (document.getElementById('element-card')) {

    document.querySelectorAll('[id=element-card]').forEach(function (el) {
        var field = JSON.parse(atob(el.getAttribute('field')));
        var element = JSON.parse(atob(el.getAttribute('element')));
        var model = JSON.parse(atob(el.getAttribute('model')));
        var parameters = el.getAttribute('parameters');

        ReactDOM.render(<CardComponent
            field={field}
            element={element}
            model={model}
            parameters={parameters}
        />, el);
    });
}