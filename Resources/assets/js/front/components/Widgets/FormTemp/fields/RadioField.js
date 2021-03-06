import React, { PureComponent } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const theme = createMuiTheme({
    typography: {
        fontSize: 18,
    },
});

export default class RadioField extends PureComponent {
    constructor(props) {
        super(props);
    }

    // ==============================
    // Handlers
    // ==============================

    handleChange(event) {
        this.props.onChange(this.props.name, event.target.value);
    };

    // ==============================
    // Renderers
    // ==============================

    renderOptions() {
        
        return this.props.arrayOfOptions.map((item, index) => {
            const bordered = item.value == this.props.value ? 'bordered' : '';
            const checked = item.value == this.props.value ? true : false;
            return (
                <FormControlLabel
                    key={index}
                    value={item.value}
                    control={
                        <Radio
                            color="primary"
                            onChange={this.handleChange.bind(this)}
                            checked={checked}
                        />
                    }
                    label={item.value}
                    labelPlacement="start"
                    className={bordered}
                />
            )
        })
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <FormControl component="fieldset" className={'container-radio-field'}>
                    {this.props.label ?
                        <label className="bmd-label-floating">
                            {this.props.label}
                        </label>
                        : null}
                    <RadioGroup 
                        aria-label="position" 
                        name="position" 
                    >
                        {this.renderOptions()}
                    </RadioGroup>
                </FormControl>
            </ThemeProvider>
        );
    }
}

RadioField.propTypes = {
    label: PropTypes.string,
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};
