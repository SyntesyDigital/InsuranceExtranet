

import React from 'react';
import PropTypes from 'prop-types';
import TableAction from './TableAction';
import TableActionGroup from './TableActionGroup';

import {
    getFieldUrl
} from './../functions';

export default class TableActions extends React.Component {

    renderActions() {
        return this.props.actions.list.map((item,index) => 
            <TableAction 
                name={item.name}
                icon={item.icon}
                modalLink={item.modalLink}
                url={getFieldUrl(item.field,this.props.row)}
                key={index}
            />
        );
    }

    render() {

        return (
            <div className="table-actions-col text-right">
                {this.renderActions()}
                <TableActionGroup
                    actions={this.props.actions.grouped}
                    row={this.props.row}
                />
            </div>
        )
    }
}

TableActions.propTypes = {
    actions: PropTypes.object.isRequired,
    row: PropTypes.object.isRequired,
};