import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ListParser from '../ListParser';

import {
    parseNumber,
    parseDate,
    getConditionalFormating,
    hasConditionalFormatting,
    getConditionalIcon,
    hasConditionalIcon
} from '../../functions';

export default class TableList extends Component {

    constructor(props) {
        super(props);
    }

    hasConditionalFormatting(conditionalFormatting) {
        if (conditionalFormatting.color !== undefined) {
            return true;
        }
        return false;
    }

    renderField(item, identifier, field) {

        var value = item[identifier];
        var hasIcon = hasConditionalIcon(field, value);

        if (field.type == "date") {
            value = parseDate(value, field);
        }
        else if (field.type == "number") {
            value = parseNumber(value, field, item, this.props.parameters);
        }
        else if (field.type == "text") {
            switch (field.settings.format) {
                case 'password':
                    value = '******';
                    break;
            }
        }

        var style = getConditionalFormating(field, value);
        var hasColor = hasConditionalFormatting(style);
        var icon = getConditionalIcon(field, value);
        var hasIcon = hasConditionalIcon(icon);


        if (field.type == "file" || field.type == "file_ws_fusion") {
            return <div dangerouslySetInnerHTML={{ __html: value }} />
        }
        // has route
        else if (field.settings.hasRoute !== undefined && field.settings.hasRoute != null) {

            return  <div className={(hasIcon ? 'has-icon' : '')}>
                        {hasIcon ? <i className={icon.icon}></i> : null}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: item[identifier + "_url"]
                            }}
                        />
                    </div>
        }
        // has default
        else {
            return  <div className={(hasIcon ? 'has-icon' : '')}>
                        {hasIcon ? <i className={icon.icon}></i> : null}
                        <div
                            className={hasColor ? 'has-color' : ''}
                            style={style}
                            dangerouslySetInnerHTML={{
                                __html: value
                            }}
                        />
                    </div>
        }
    }

    renderItem(item, elementObject) {

        var file = null;
        var infos = [];

        for (var key in elementObject.fields) {
            // console.log("TypologyPaginated => ",items[key]);
            var identifier = elementObject.fields[key].identifier
            if (elementObject.fields[key].type == 'file' || elementObject.fields[key].type == "file_ws_fusion") {
                file = this.renderField(item, identifier, elementObject.fields[key]);
                isFile = true;
            }
            else {
                infos.push(
                    <div className="field-container" key={key}>
                        {this.renderField(item, identifier, elementObject.fields[key])}
                    </div>
                );
            }

        }
        return (
            <div>
                <div className={"file-infos-container " + (file == null ? 'no-document' : '')}>
                    {file != null &&
                        <div className={"file-icon "}>
                            {file}
                        </div>
                    }
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
                    customClass="table-list-container"
                    field={this.props.field}
                    elementObject={this.props.elementObject}
                    model={this.props.model}
                    pagination={this.props.pagination}
                    itemsPerPage={this.props.itemsPerPage}
                    columns={this.props.columns}
                    parameters={this.props.parameters}
                    renderItem={this.renderItem.bind(this)}
                    autoHeight={this.props.autoHeight}
                />
            </div>

        );

    }
}

if (document.getElementById('table-list')) {

    document.querySelectorAll('[id=table-list]').forEach(function (element) {
        var field = element.getAttribute('field');
        var elementObject = element.getAttribute('elementObject');
        var model = element.getAttribute('model');
        var itemsPerPage = element.getAttribute('itemsPerPage');
        var parameters = element.getAttribute('parameters');
        var columns = element.getAttribute('columns');
        var autoHeight = element.getAttribute('autoHeight');

        ReactDOM.render(<TableList
            field={field}
            elementObject={elementObject}
            model={model}
            itemsPerPage={itemsPerPage}
            columns={columns}
            autoHeight={autoHeight}
            parameters={parameters}
        />, element);
    });
}
