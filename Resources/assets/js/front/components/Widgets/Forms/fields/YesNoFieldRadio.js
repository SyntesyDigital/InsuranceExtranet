import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


export default class YesNoFieldRadio extends Component {
    constructor(props) {
        super(props);
    }

    // ==============================
    // Handlers
    // ==============================

    handleChange(event) {
        this.props.onChange({
            name: this.props.field.identifier,
            value: event.target.value
        });
    }

    // ==============================
    // Getters
    // ==============================

    getConfig() {
        var config = {
            checked: '1',
            unchecked: '0'
        };

        var field = this.props.field;

        if (field.settings.booleanValues !== undefined &&
            field.settings.booleanValues != null) {
            config = field.settings.booleanValues;
        }

        return config;
    }

    /**
      Returns the value depending on the configuration
    */
    getFieldValue(checked) {

        var config = this.getConfig();

        //console.log("YesNoField:: getConfig() :: ",config);

        if (checked)
            return config.checked;
        else
            return config.unchecked;
    }

    getConfigValue(value) {
        var config = this.getConfig();

        if (value === undefined || value === "" || value === null) {
            return null;
        }

        if (config.checked == value) {
            return true;
        }
        else {
            return false;
        }
    }


    // ==============================
    // Renderers
    // ==============================


    renderOptionRadio(label, value, currentValue) {

        var checked = currentValue === value ? true : false;
        const bordered = checked ? 'bordered' : '';

        return (
            <FormControlLabel
                key={label}
                value={value}
                control={
                    <Radio
                        color="primary"
                        value={value}
                        onChange={this.handleChange.bind(this)}
                        checked={checked}
                    />
                }
                label={label}
                labelPlacement="end"
                className={bordered}
            />
        );
    }


    render() {

        const {
            errors,
            colClassLabel,
            isHideLabel,
            name,
            isRequired,
            colClassInput,
        } = this.props;

        return (
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    <div className={"col-md-12 container-radio-field yes-no-field" + (errors)}>
                        <div className={'row field-container'}>
                            <div className={colClassLabel}>
                                <div className="container-text">
                                    {!isHideLabel &&
                                        <span>{name}
                                            {isRequired &&
                                                <span className="required">&nbsp; *</span>
                                            }
                                        </span>
                                    }
                                </div>
                            </div>
                            <div className={colClassInput}>
                                <div className="container-fields-yes-no">
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="position" name="position">
                                            {this.renderOptionRadio(
                                                "Oui",
                                                this.getFieldValue(true),
                                                this.props.value)
                                            }
                                            {this.renderOptionRadio(
                                                "Non",
                                                this.getFieldValue(false),
                                                this.props.value)
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        clear: 'both',
                        fontSize: '1px',
                        lineHeight: 0,
                        height: '1px',
                        pointerEvents: 'none',
                    }}></div>
                </ThemeProvider>
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

YesNoFieldRadio.propTypes = {
    errors: PropTypes.string,
    colClassLabel: PropTypes.string,
    isHideLabel: PropTypes.bool,
    name: PropTypes.string,
    isRequired: PropTypes.bool,
    colClassInput: PropTypes.string,
    field: PropTypes.object,
    onChange: PropTypes.func,
    value: PropTypes.string,

};