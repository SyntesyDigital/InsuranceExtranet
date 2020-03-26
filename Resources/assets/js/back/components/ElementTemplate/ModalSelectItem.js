import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import {
    cancelItem,
    itemSelected,
    addRow
} from './actions/';

class ModalSelectItem extends Component {

    constructor(props) {
        super(props);
        this.onModalClose = this.onModalClose.bind(this);
    }

    componentDidMount() {
        if (this.props.modalItem.displayModal) {
            this.modalOpen();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.modalItem.displayModal) {
            this.modalOpen();
        } else {
            this.modalClose();
        }
    }

    onModalClose(e) {
        e.preventDefault();
        this.props.cancelItem();
    }

    handleSelectItem(item) {
        this.props.itemSelected(
            item,
            this.props.modalItem.pathToIndex,
            this.props.modalItem.addPosition,
            this.props.layout
        );
    }

    modalOpen() {
        TweenMax.to($("#select-item-modal"), 0.5, { opacity: 1, display: "block", ease: Power2.easeInOut });
    }

    modalClose() {
        var self = this;
        TweenMax.to($("#select-item-modal"), 0.5, {
            display: "none", opacity: 0, ease: Power2.easeInOut, onComplete: function () {
                self.setState({
                    imageSelected: null
                });
            }
        });
    }

    exploteToObject(fields) {
        if (fields == null) {
            return null;
        }

        var result = {};

        for (var i = 0; i < fields.length; i++) {
            result[fields[i]] = null;
        }
        return result;
    }

    addRow(e) {
        e.preventDefault();

        this.handleSelectItem({
            type: 'row',
            settings: this.exploteToObject(ROW_SETTINGS),
            children: [
                {
                    type: 'col',
                    settings: this.exploteToObject(COL_SETTINGS),
                    colClass: 'col-xs-12',
                    children: []
                }
            ]
        });
    }

    exploteToObject(fields) {
        if (fields == null) {
            return null;
        }

        var result = {};

        for (var i = 0; i < fields.length; i++) {
            result[fields[i]] = null;
        }
        return result;
    }

    addItem(field, e) {
        e.preventDefault();

        var newField = JSON.parse(JSON.stringify(field));

        newField.rules = this.exploteToObject(newField.rules);
        newField.settings = this.exploteToObject(newField.settings);
        newField.identifier = "temp_" + JSON.stringify(this.props.modalItem.pathToIndex);

        this.handleSelectItem({
            type: 'item',
            field: newField
        });
    }

    addSeparator(e) {

        e.preventDefault();

        var newField = JSON.parse(JSON.stringify(WIDGETS['SEPARATOR']));

        newField.rules = this.exploteToObject(newField.rules);
        newField.settings = this.exploteToObject(newField.settings);

        this.handleSelectItem({
            type: 'item',
            field: newField
        });
    }

    renderFields() {

        var fields = [];

        for (var key in ELEMENT_TEMPLATE_FIELDS) {
            fields.push(
                <div className="col-xs-3" key={key}>
                    <a href="" onClick={this.addItem.bind(this, ELEMENT_TEMPLATE_FIELDS[key])}>
                        <div className="grid-item">
                            <i className={"fa " + ELEMENT_TEMPLATE_FIELDS[key].icon}></i>
                            <p className="grid-item-name">
                                {ELEMENT_TEMPLATE_FIELDS[key].name}
                            </p>
                        </div>
                    </a>
                </div>
            );
        }

        return fields;
    }

    render() {
        return (
            <div className="custom-modal no-buttons" id="select-item-modal">
                <div className="modal-background"></div>

                <div className="modal-container">
                    <div className="modal-header">
                        <h2></h2>

                        <div className="modal-buttons">
                            <a className="btn btn-default close-button-modal" onClick={this.onModalClose}>
                                <i className="fa fa-times"></i>
                            </a>
                        </div>
                    </div>

                    <div className="modal-content">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-md-10 col-md-offset-1">

                                    <h3 className="card-title">{Lang.get('fields.new_element')}</h3>
                                    <h6>{Lang.get('modals.select_list_to_add')} </h6>


                                    <div className="grid-items">
                                        <div className="row">

                                            <div className="col-xs-3">
                                                <a href="" onClick={this.addRow.bind(this)}>
                                                    <div className="grid-item">
                                                        <i className="fa fa-columns"></i>
                                                        <p className="grid-item-name">
                                                            {Lang.get('fields.row')}
                                                        </p>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="col-xs-3">
                                                <a href="" onClick={this.addSeparator.bind(this)}>
                                                    <div className="grid-item">
                                                        <i className={"fa " + WIDGETS['SEPARATOR'].icon}></i>
                                                        <p className="grid-item-name">
                                                            {Lang.get('fields.separator')}
                                                        </p>
                                                    </div>
                                                </a>
                                            </div>

                                            {this.renderFields()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <a href="" className="btn btn-default" onClick={this.onModalClose}> {Lang.get('fields.cancel')} </a> &nbsp;
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        layout: state.template.layout,
        modalItem : state.modalItem
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addRow: (layout) => {
            return dispatch(addRow(layout));
        },
        cancelItem: () => {
            return dispatch(cancelItem());
        },
        itemSelected: (item, pathToIndex, position, layout) => {
            return dispatch(itemSelected(item, pathToIndex, position, layout))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSelectItem);
