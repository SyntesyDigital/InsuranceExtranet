import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment';
import ListParser from '../ListParser';

import {
    parseNumber,
    parseDate
} from '../../functions';


export default class TableDocument extends Component {

    constructor(props) {
        super(props);
    }

    renderField(value, field) {
        if (field.type == "date") {
            value = parseDate(value, field);
        }
        else if (field.type == "number") {
            value = parseNumber(value,field,this.props.elementObject.fields, this.props.parameters);
        }
        else if (field.type == "file" || field.type == "file_ws_fusion") {
            return <div dangerouslySetInnerHTML={{ __html: value }} />
        }

        return value;
    }

    renderItem(item, elementObject) {

        var file = null;
        var infos = [];

        for (var key in elementObject.fields) {
            // console.log("TypologyPaginated => ",items[key]);
            var identifier = elementObject.fields[key].identifier
            if (elementObject.fields[key].type == 'file' || elementObject.fields[key].type == "file_ws_fusion") {

                file = this.renderField(item[identifier], elementObject.fields[key]);

            } else {
                infos.push(
                    <div className="field-container" key={key}>
                        {this.renderField(item[identifier], elementObject.fields[key])}
                    </div>
                );
            }

        }

        return (
            <div>
                <div className="file-contianer">
                    {file}
                </div>
                <div className="file-infos-container">
                    <div className="file-icon">
                        <i className="far fa-file"></i>
                    </div>
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
                    field={this.props.field}
                    elementObject={this.props.elementObject}
                    model={this.props.model}
                    pagination={this.props.pagination}
                    itemsPerPage={this.props.itemsPerPage}
                    columns={this.props.columns}
                    parameters={this.props.parameters}
                    renderItem={this.renderItem.bind(this)}
                />
            </div>

        );

    }
}

if (document.getElementById('table-document')) {

    document.querySelectorAll('[id=table-document]').forEach(function (element) {
        var field = element.getAttribute('field');
        var elementObject = element.getAttribute('elementObject');
        var model = element.getAttribute('model');
        var itemsPerPage = element.getAttribute('itemsPerPage');
        var parameters = element.getAttribute('parameters');
        var columns = element.getAttribute('columns');

        ReactDOM.render(<TableDocument
            field={field}
            elementObject={elementObject}
            model={model}
            itemsPerPage={itemsPerPage}
            columns={columns}
            parameters={parameters}
        />, element);
    });
}
