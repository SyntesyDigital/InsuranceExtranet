import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListField extends Component {

    constructor(props) {
        super(props);
    }

    // ==============================
    // Handlers
    // ==============================

    handleEdit(e) {
        this.props.onEdit();
    }

    handleRemove(e) {
        e.preventDefault();
        var _this = this;

        bootbox.confirm({
            message: this.props.rempoveMessage !== undefined ?
                this.props.rempoveMessage : Lang.get('Want to remove this item?'),
            buttons: {
                confirm: {
                    label: Lang.get('Oui'),
                    className: 'btn-primary'
                },
                cancel: {
                    label: Lang.get('Non'),
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if (result) {
                    _this.props.onRemove();
                }
            }
        });

    }

    handleOnChange(e) {
        this.props.onChange(this.props.name, e.target.value);
    }

    // ==============================
    // Renderers
    // ==============================

    render() {
        const divStyle = {
            cursor: 'pointer',
            textAlign: 'center',
            border: '1px dashed #ccc',
            padding: '15px',
            marginBottom: '25px',
        };

        const { identifier } = this.props;

        let fields = this.props.arrayOfFields.map((item, index) =>
            <div className="col-md-3 col-xs-3" key={index}>
                <label
                    value={item.value}
                >
                    {item.name}
                </label>
            </div>
        );

        return (
            <div>
                <div className="fields-list-container">
                    <div id={"field-list-item-" + identifier} className="typology-field field-list-item">
                        <div className="field-type">
                            <i className={this.props.icon}></i> &nbsp;
    					    {this.props.label}
                            <div className="type-info">
                                <span className="text-success"></span>
                            </div>
                        </div>
                        <div className="field-labels">
                            <div className="row">
                                {fields}
                            </div>
                        </div>
                        <div className="field-actions text-right" style={{ paddingRight: '15px' }}>
                            <a href="#" onClick={this.handleEdit.bind(this)}>
                                <i className="fas fa-pencil-alt"></i> {Lang.get('header.configuration')}
                            </a>
                            <a href="#" className="remove-field-btn" onClick={this.handleRemove.bind(this)}>
                                &nbsp;&nbsp;
                            <i className="fa fa-trash"></i> {Lang.get('Suprimmier')}
                            </a>
                        </div>
                    </div>
                    <div id={identifier} style={divStyle} className="more-btn">
                        <a href="#" className="btn" onClick={this.props.onAdd} style={{ borderRadius: '20px' }}>
                            <span className="field-name"><i className="fas fa-plus-circle"></i> Ajouter</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

ListField.propTypes = {
    icon: PropTypes.string.isRequired,
    label: PropTypes.string,
    icons: PropTypes.array,
    index: PropTypes.number,
    labelInputLeft: PropTypes.string,
    labelInputRight: PropTypes.string,

    //onEvents props
    onEdit: PropTypes.func,
    onRemove: PropTypes.func

};
