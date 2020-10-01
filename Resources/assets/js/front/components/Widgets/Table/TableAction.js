

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import TableActionLink from './TableActionLink';

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

    render() {

        return (
            <HtmlTooltip
                title={
                    <span className={'content-desc'}>
                        {this.props.name ? this.props.name : ''}
                    </span>
                }
                placement="bottom"
            >
                <TableActionLink
                    icon={this.props.icon}
                    name={''}
                    modalLink={this.props.modalLink}
                    url={this.props.url}
                />
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