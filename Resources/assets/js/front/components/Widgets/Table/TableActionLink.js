

import React from 'react';
import PropTypes from 'prop-types';

export default class TableActionLink extends React.Component {

    render() {

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
                className={hasModalLink ? 'simple-btn modal-link' : 'simple-btn'}
                data-modal={hasModalLink ? this.props.url : ''}
            >
                {icon != null &&
                    <span style={{ fontSize: 16, marginRight: 10 }}>
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
                {this.props.name}
            </a>
        )
    }
}

TableActionLink.propTypes = {
    icon: PropTypes.object,
    name: PropTypes.string,
    modalLink: PropTypes.bool,
    url: PropTypes.string,
};