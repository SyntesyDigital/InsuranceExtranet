

import React from 'react';
import PropTypes from 'prop-types';
import TableActionLink from './TableActionLink';

import {
    getFieldUrl
} from './../functions';

export default class TableActionGroup extends React.Component {

    renderActionList() {
        return this.props.actions.map((item,index) => 
            <li key={index}>
                <TableActionLink
                    icon={item.icon}
                    name={item.name}
                    modalLink={item.modalLink}
                    url={getFieldUrl(item.field,this.props.row)}
                />
            </li>
        );
    }

    render() {

        //if no grouped actiosn don't show list
        if(this.props.actions === undefined || this.props.actions.length == 0)
            return null;

        return (
            <div className="action-list-container">
                <a href="#" 
                    style={{fontSize : 18, marginRight : 15}} 
                    className="dropdown-toggle btn-action" 
                    data-toggle="dropdown" 
                    aria-expanded="false">
                        <i className="fas fa-ellipsis-h"></i>
                </a>
                <ul className="dropdown-menu default-padding dropdown-menu-right">
                    {this.renderActionList()} 
                </ul>
            </div>
        )
    }
}

TableActionGroup.propTypes = {
    actions: PropTypes.array.isRequired,
    row: PropTypes.object.isRequired,
};