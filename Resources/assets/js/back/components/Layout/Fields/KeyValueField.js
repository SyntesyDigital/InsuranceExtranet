import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputField from './InputField';

export default class KeyValueField extends Component {

    constructor(props) {
        super(props);
    }

    handleFieldChange(name,value) {
        
        var state = {
            key : this.props.keyValue,
            value : this.props.value
        };

        state[name] = value;

        this.props.onChange(this.props.name,state,this.props.index);
    }

    handleRemove(e) {
        e.preventDefault();

        var self = this;

		bootbox.confirm({
            message: Lang.get('fields.sure'),
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
                if(result){
                    self.props.onRemove(self.props.index);
                }
            }
		});
    }

    render() {
        const { label, error } = this.props;
        return (
            <div className={"key-value-field" + (error ? ' has-error' : '')}>
                <div className="row">
                    <div className="col-sm-5">
                        <InputField 
                            name="key"
                            placeholder={this.props.keyLabel}
                            value={this.props.keyValue}
                            onChange={this.handleFieldChange.bind(this)}
                        />
                    </div>
                    <div className="col-sm-6">
                        <InputField 
                            name="value"
                            placeholder={this.props.valueLabel}
                            value={this.props.value}
                            onChange={this.handleFieldChange.bind(this)}
                        />
                    </div>
                    <div className="col-sm-1">
                        <a href="" style={{top : '5px'}} class="text-danger" onClick={this.handleRemove.bind(this)}>
                            <i class="fas fa-trash"></i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

KeyValueField.propTypes = {
    index: PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    keyLabel: PropTypes.string.isRequired,
    valueLabel: PropTypes.string.isRequired,
    keyValue: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange : PropTypes.func,
    onRemove : PropTypes.func
};
