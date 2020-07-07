import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const SwitchYesNo = withStyles((theme) => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        color: '#fff',
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: STYLES.elementForm.inputColor,
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: STYLES.elementForm.inputColor,
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid #e6e6e6`,
        backgroundColor: '#e6e6e6',
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

export default class YesNoFieldSwitch extends Component {

    constructor(props) {

        super(props);

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        this.props.onChange({
            name: event.target.name,
            value: event.target.checked
        });
    }

    render() {
        const styles = {
            display: 'inline-block'
        }
        return (
            <FormGroup className="yesNoFieldSwitch">
                <Typography component="div">
                    {this.props.label ? <label class="bmd-label-floating label-question" style={{minWidth: '260px'}}>{this.props.label}</label> : null}
                    <label className="bmd-label-floating" htmlFor={this.props.identifier}>{this.props.label1}</label>
                    <Grid item style={styles}>
                        <SwitchYesNo id={this.props.identifier} checked={this.props.checked} onChange={this.handleChange.bind(this)} name={this.props.name} />
                    </Grid>
                    <label className="bmd-label-floating" htmlFor={this.props.identifier}>{this.props.label2}</label>
                </Typography>
            </FormGroup>
        );
    }
}

YesNoFieldSwitch.propTypes = {
    identifier: PropTypes.string.isRequired,
    label: PropTypes.string,
    label1: PropTypes.string,
    label2: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool
};
