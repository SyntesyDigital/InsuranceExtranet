import React, { Component } from 'react';
import IconField from '../../../Layout/Fields/IconField';
// import { 
//     IconField
// } from "architect-components-library";

class Condition extends Component {

    constructor(props) {
        super(props);
    }

    handleConditionRemove(index, e) {
        e.preventDefault();

        var _index = index;
        var _this = this;

        bootbox.confirm({
            message: 'Êtes-vous sûr de supprimer définitivement ce condition',
            buttons: {
                confirm: {
                    label: Lang.get('fields.si'),
                    className: 'btn-primary'
                },
                cancel: {
                    label: Lang.get('fields.no'),
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if (result) {
                    _this.props.onRemove(_index);
                }
            }
        });
    }

    handleOnChange(e) {
        this.props.onFieldChange(e.target.name, e.target.value);
    }

    render() {

        return (
            <div className="condition-item row">
                <div className="col-sm-10">
                    <div className="field-name col-xs-6">
                        <input
                            type="text"
                            className="form-control"
                            name="value"
                            value={this.props.item.value}
                            placeholder={'Valeur'}
                            onChange={this.handleOnChange.bind(this)}
                        />
                    </div>
                    <div className="col-xs-6">
                        <IconField
                            label={'Icone'}
                            name={'icon'}
                            value={this.props.item.icon}
                            onChange={this.props.onFieldChange}
                            labelHide={true}
                        />
                    </div>
                </div>
                <div className="col-sm-2 text-right">
                    <a href="" onClick={this.handleConditionRemove.bind(this, this.props.index)} className="text-danger">
                        <i className="fas fa-trash"></i>
                    </a>
                </div>
            </div>

        );
    }
}

export default Condition;
