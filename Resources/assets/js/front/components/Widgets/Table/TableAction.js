

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
            ? this.props.icon.icon : null ;

        return (
            <a 
                href={!hasModalLink ? this.props.url : ''} 
                className={hasModalLink ? 'modal-link' : ''} 
                data-modal={hasModalLink ? this.props.url : ''}
            >
                {icon != null && 
                    <span style={{fontSize : 18, marginRight : 15}}>
                        <i className={icon}></i>&nbsp;
                    </span>
                } 
            </a>
        );
    }

    render() {

        const hasModalLink = this.props.modalLink !== undefined 
            ? this.props.modalLink : false;

        //if no link defined no action
        if(!hasModalLink && this.props.url == ''){
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