

import React from 'react';
import PropTypes from 'prop-types';

export default class TableActionLink extends React.Component {

    render() {

        const hasModalLink = this.props.modalLink !== undefined 
            ? this.props.modalLink : false;

        const icon = this.props.icon !== undefined && this.props.icon.icon !== undefined 
            ? this.props.icon.icon : null ;

        return (
            <a 
                href={!hasModalLink ? this.props.url : ''} 
                className={hasModalLink ? 'simple-btn modal-link' : 'simple-btn'} 
                data-modal={hasModalLink ? this.props.url : ''}
            >
                {icon != null && 
                    <span style={{fontSize : 16, marginRight : 10}}>
                        <i className={icon}></i>&nbsp;
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