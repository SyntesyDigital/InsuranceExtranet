import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RowContainer from './RowContainer';

import EmptyItem from './EmptyItem';
import PageItem from './PageItem';

import {
    selectItem,
    editSettings,
} from './../actions/';

import {
    ITEM_POSITION_BEFORE,
    ITEM_POSITION_AFTER
} from './../constants/';

class ColContainer extends Component {

    constructor(props) {
        super(props);
    }

    // ==============================
    // Handlers
    // ==============================

    handleAdd(e){
        e.preventDefault();
       
        this.props.selectItem(
            this.props.pathToIndex,
            ITEM_POSITION_AFTER
        );
    }

    handleEdit(e){
        e.preventDefault();
        this.props.onEdit();
    }

    // ==============================
    // Renderers
    // ==============================

    renderChildren() {

        var children = [];

        if (this.props.data.children != null && this.props.data.children !== undefined &&
            this.props.data.children.length > 0) {
            for (var key in this.props.data.children) {
                var item = this.props.data.children[key];
                if (item.type == "row") {
                    children.push(
                        <RowContainer
                            key={key}
                            index={parseInt(key)}
                            childrenLength={this.props.data.children.length}
                            data={item}
                            pathToIndex={this.getPathToIndex(key)}
                        />
                    );
                }
                else if (item.type == "item") {
                    children.push(
                        <PageItem
                            key={key}
                            childrenLength={this.props.data.children.length}
                            data={item}
                            pathToIndex={this.getPathToIndex(key)}
                        />
                    );
                }
                else {
                    <EmptyItem
                        key={key}
                        index={key}
                        onSelectItem={this.onSelectItem.bind(this)}
                        pathToIndex={this.props.pathToIndex}
                    />
                }

            }
        }
        else {
            children.push(
                <EmptyItem
                    key={0}
                    index={0}
                    onSelectItem={this.onSelectItem.bind(this)}
                    pathToIndex={this.props.pathToIndex}
                />
            );
        }

        return children;
    }

    render() {
        const { editButton } = this.props;
        return (
            <div className="col-container">
                <div className="row-container-body-content">
                    <div className="row-container-body-top">
                        {editButton ?
                            <a href="#" className="btn btn-link" onClick={this.handleEdit.bind(this)}>
                                <i className="fa fa-pencil-alt"></i>
                            </a>
                        : null}
                    </div>
                    <div>
                        {this.props.children}
                    </div>
                    <div className="row-empty-item">
                        <a href="#" className="btn btn-link" onClick={this.handleAdd.bind(this)}>
                            <i className="fa fa-plus"></i>
                        </a>
                    </div>

                    {this.renderChildren()}

                    <div className="row-container-body-bottom"></div>
                </div>
            </div>
        );
    }
}

// ColContainer.propTypes = {

//     editButton: PropTypes.bool,
//     onAdd: PropTypes.func,
//     onEdit: PropTypes.func,

// };


const mapStateToProps = state => {
    return {
        layout: state.template.layout
    }
}

const mapDispatchToProps = dispatch => {
    return {
        /*
        selectItem: (pathToIndex, position) => {
            return dispatch(selectItem(pathToIndex, position));
        },
        editSettings: (item) => {
            return dispatch(editSettings(item))
        },
        */
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColContainer);