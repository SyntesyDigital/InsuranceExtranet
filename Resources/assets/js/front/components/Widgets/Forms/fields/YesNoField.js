import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import YesNoFieldSwitch from './YesNoFieldSwitch';
import YesNoFieldRadio from './YesNoFieldRadio';

export default class YesNoField extends Component {
    constructor(props) {
        super(props);
        this.renderFieldType = this.renderFieldType.bind(this);
    }

    // ==============================
    // Handlers
    // ==============================

    handleOnChange(event) {
        this.props.onFieldChange({
            name: this.props.field.identifier,
            value: event.value
        });
    }

    // ==============================
    // Renderers
    // ==============================


    renderFieldType(type) {

        const { field } = this.props;

        const errors = this.props.error ? ' has-error' : '';

        let isRequired = field.rules.required !== undefined ?
            field.rules.required : false;

        let isHideLabel = field.settings.hidelabel !== undefined ?
            field.settings.hidelabel : false;

        let isLabelInline = field.settings.labelInline !== undefined ?
            field.settings.labelInline : false;

        var colClassLabel = isLabelInline ?
            'field-container-col col-xs-5' :
            'field-container-col col-xs-12';

        var colClassInput = isLabelInline ?
            'field-container-col col-xs-7' :
            'field-container-col col-xs-12';

        //required can be set also directly with modals
        if (this.props.isModal !== undefined && this.props.isModal &&
            field.required !== undefined) {
            isRequired = field.required;
        }

        switch (type) {
            case 'radio':
                return (
                    <YesNoFieldRadio
                        errors={errors}
                        colClassLabel={colClassLabel}
                        isHideLabel={isHideLabel}
                        name={field.name}
                        isRequired={isRequired}
                        colClassInput={colClassInput}
                        field={this.props.field}
                        onChange={this.handleOnChange.bind(this)}
                        value={this.props.value}
                    />
                )
            case 'toggle':
                return (
                    <YesNoFieldSwitch
                        label={field.name}
                        label1={'Non'}
                        label2={'Oui'}
                        onChange={this.handleOnChange.bind(this)}
                        errors={errors}
                        isHideLabel={isHideLabel}
                        isRequired={isRequired}
                        value={this.props.value}
                        field={this.props.field}

                    />
                );
            default:
                return (
                    <YesNoFieldRadio
                        errors={errors}
                        colClassLabel={colClassLabel}
                        isHideLabel={isHideLabel}
                        name={field.name}
                        isRequired={isRequired}
                        colClassInput={colClassInput}
                        field={this.props.field}
                        onChange={this.handleOnChange.bind(this)}
                        value={this.props.value}
                    />
                );
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.renderFieldType(this.props.field.settings.yesNoStyle !== undefined ?
                    this.props.field.settings.yesNoStyle
                    : 'radio')
                }
            </React.Fragment>
        );
    }
}


// ==============================
// Theme
// ==============================

const theme = createMuiTheme({
    typography: {
        fontSize: 18,
    },
});

