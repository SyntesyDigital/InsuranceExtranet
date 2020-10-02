

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import iconSvg from './assets/img/ico_info.svg';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: STYLES.elementForm.backgroundColorTooltipDescForm,
        color: STYLES.elementForm.colorTooltipDescForm,
        maxWidth: 220,
        fontSize: STYLES.elementForm.fontSizeTooltipDescForm,
        borderRadius: 0,
        padding: '15px',
    },
}))(Tooltip);

export default class LabelTooltip extends React.Component {

    render() {
        return (
            <HtmlTooltip
                title={
                    <span className={'content-desc'}>
                        {this.props.description ? this.props.description : ''}
                    </span>
                }
                placement="right-start"
            >
                <Button>
                    <img
                        className={'icon-desc-info'}
                        src={iconSvg}
                    />
                </Button>
            </HtmlTooltip>
        )
    }
}

LabelTooltip.propTypes = {
    description: PropTypes.string
};