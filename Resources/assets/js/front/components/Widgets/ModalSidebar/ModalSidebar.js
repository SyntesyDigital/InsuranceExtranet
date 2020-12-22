import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import './ModalSidebar.scss';
import ListParser from '../Lists/ListParser';
import TableActions from '../Table/TableActions';


import {
    parseNumber,
    parseDate,
    getConditionalFormating,
    hasConditionalFormatting,
    getConditionalIcon,
    hasConditionalIcon,
    cleanIdentifier,
    isGrouped
} from '../functions';

export default class ModalSidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate(prevProps, prevState) {

        if(this.props.display != prevProps.display) {
            TweenMax.to("#"+this.props.id, 0.5, {
                right: this.props.display ? "0px" : "-312px",
                visibility: "visible"
            }, {
                ease: Power2.easeInOut,
                onComplete: function () { }
            });

        }

    }

    // ==============================
    // Handlers
    // ==============================

    handleOnChange(e) {
        this.props.onChangeSearch(e.target.value);
    }

    handleClickDate() {
        console.log("handleClickDate :: ");
    }

    handleRemoveItem(){
        console.log("handleRemoveItem :: ");
    }

    // ==============================
    // Renderers
    // ==============================

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
                        <a href={item[identifier + "_url"]}>
                            {hasIcon ? <i className={icon.icon}></i> : null} &nbsp;
                            {item[identifier]}
                        </a>
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

    getActions(elementObject) {

        var actionsCount = 0;

        var actions = {
            list: [],
            grouped: []
        };

        for (var index in elementObject.fields) {

            //if object field is an action continue to next field
            var field = elementObject.fields[index];
            if (field.type != "action")
                continue;


            actionsCount++;

            var action = {
                icon: getConditionalIcon(field, ''),
                name: field.name,
                modalLink: false,
                field: field,
                identifier: cleanIdentifier(field.identifier)
            };

            if (isGrouped(field)) {
                actions.grouped.push(action);
            }
            else {
                actions.list.push(action);
            }
        }

        if(actionsCount > 0 )
            return actions;
        else 
            return null;
    }

    renderItem(item, elementObject) {
    
        var infos = [];
        var actions = this.getActions(elementObject);

        for (var key in elementObject.fields) {
            // console.log("TypologyPaginated => ",items[key]);

            if (elementObject.fields[key].type == "action")
                continue;

            var identifier = elementObject.fields[key].identifier
            infos.push(
                <div className="field-container" key={key}>
                    {this.renderField(item, identifier, elementObject.fields[key])}
                </div>
            );
        }

        //console.log("renderItem : (item,actions)",item,actions);

        return (
            <div className="row-item">
                {infos}
                {/*
                <h5>{'Numero de contract'}</h5>
                <a href="#" className="date-link" onClick={this.handleClickDate.bind(this)}><span className="date">22 avril 2020</span></a>
                <a href="#" className="trash-link" onClick={this.handleRemoveItem.bind(this)}><span className="trash"></span></a>
                */}
                {actions != null && 
                    <TableActions
                        actions={actions}
                        row={{original : item}}
                        textAlign={''}
                    />
                }
            </div>
        );
    }

    render() {
        return (
            <div className="modal-sidebar" id={this.props.id}>
                <div className="wrapper-items">

                    <h3>{this.props.title}</h3>

                    { this.props.display && 
                        <ListParser
                            customClass="notifications-list-container"
                            field={null}
                            elementObject={btoa(JSON.stringify(this.props.elementObject))}
                            model={btoa(JSON.stringify(this.props.elementModel))}
                            pagination={false}
                            itemsPerPage={20}
                            //columns={this.props.columns}
                            //parameters={[]}
                            renderItem={this.renderItem.bind(this)}
                        />
                    }

                </div>
            </div>
        );
    }
}

ModalSidebar.propTypes = {
    display: PropTypes.bool,
    elementObject: PropTypes.object,
    elementModel: PropTypes.object,
};

