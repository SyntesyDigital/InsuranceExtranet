

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import TableActionLink from './TableActionLink';
import LabelTooltip from '../../Common/LabelTooltip';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: STYLES.elementForm.backgroundColorTooltipDescForm,
        color: STYLES.elementForm.colorTooltipDescForm,
        maxWidth: 220,
        fontSize: STYLES.elementForm.fontSizeTooltipDescForm,
        borderRadius: 0,
        padding: '5px',
    },
}))(Tooltip);

export default class TableAction extends React.Component {

    renderIcon() {
        const hasModalLink = this.props.modalLink !== undefined
            ? this.props.modalLink : false;

        const icon = this.props.icon !== undefined && this.props.icon.icon !== undefined
            ? this.props.icon.icon : null;

        const hasFontAwesome = SITE_CONFIG_GENERAL.FONTAWESOME_IS_ACTIVE !== undefined
            && SITE_CONFIG_GENERAL.FONTAWESOME_IS_ACTIVE !== null
            && SITE_CONFIG_GENERAL.FONTAWESOME_IS_ACTIVE.value == true
            ? true
            : false;

        const hasCreaticLib = SITE_CONFIG_GENERAL.CREATIC_LIB_IS_ACTIVE !== undefined
            && SITE_CONFIG_GENERAL.CREATIC_LIB_IS_ACTIVE !== null
            && SITE_CONFIG_GENERAL.CREATIC_LIB_IS_ACTIVE.value == true
            ? true
            : false;

        return (
            <a
                href={!hasModalLink ? this.props.url : ''}
                className={hasModalLink ? 'modal-link' : ''}
                data-modal={hasModalLink ? this.props.url : ''}
            >
                {icon != null &&
                    <span style={{ fontSize: 18, marginRight: 15 }}>
                        {hasFontAwesome &&
                            <i className={icon}></i>
                        }
                        {hasCreaticLib &&
                            <svg className={'icon ' + icon}>
                                <use xlinkHref={'#' + icon}></use>
                            </svg>
                        }
                        &nbsp;
                    </span>
                }
            </a>
        );
    }

    render() {

        const hasModalLink = this.props.modalLink !== undefined
            ? this.props.modalLink : false;

        //if no link defined no action
        if (this.props.url == '') {
            return null;
        }

        return (
            <HtmlTooltip
                title={
                    <span className={'content-desc'}>
                        {this.props.name ? this.props.name : ''}
                    </span>
                }
                placement="bottom"
            >
                {this.renderIcon()}
            </HtmlTooltip>
        )
    }
}

TableAction.propTypes = {
    icon: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    modalLink: PropTypes.bool,
    url: PropTypes.string,
};