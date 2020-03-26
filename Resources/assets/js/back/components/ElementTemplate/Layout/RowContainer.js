import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ColContainer from './ColContainer';


import {
    deleteRow,
    pullUpItem,
    pullDownItem
} from '../actions';

class RowContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            olsOpen : false
        };
    
        this.colTypes = [
            ['col-xs-12'],
            ['col-xs-12 col-sm-6','col-xs-12 col-sm-6'],
            ['col-xs-12 col-sm-4','col-xs-12 col-sm-8'],
            ['col-xs-12 col-sm-8','col-xs-12  col-sm-4'],
            ['col-xs-12  col-sm-4','col-xs-12 col-sm-4','col-xs-12 col-sm-4'],
            ['col-xs-12 col-sm-6 col-md-3','col-xs-12  col-sm-6 col-md-3','col-xs-12  col-sm-6 col-md-3','col-xs-12 col-sm-6 col-md-3'],
            ['col-xs-12 col-sm-offset-1 col-sm-10 columna central']
        ];
    }

    // ==============================
    // Handlers
    // ==============================

    handleEdit(e) {
        e.preventDefault();
        this.props.onEdit();
    }

    handleUp(e) {
        e.preventDefault();
        this.props.pullUpItem(
            this.props.pathToIndex,
            this.props.layout
        );
    }

    handleDown(e){
        e.preventDefault();
        this.props.pullDownItem(
            this.props.pathToIndex,
            this.props.layout
        );
    }

    handleColumns(e) {
        e.preventDefault();
        console.log('handleColumns :: ')
    }


    handleDuplicate(e){
        e.preventDefault();
        this.props.onDuplicate();
    }
    
    handleRemove(e){
        e.preventDefault();
  
        var self = this;

        bootbox.confirm({
            message: Lang.get('fields.delete_row_alert'),
            buttons: {
                confirm: {
                    label: Lang.get('fields.si'),
                    className: 'btn-primary'
                },
                cancel: {
                    label: Lang.get('fields.no'),
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if (result) {
                    self.props.deleteRow(
                        self.props.pathToIndex,
                        self.props.layout
                    );
                }
            }
        });
    }

    // ==============================
    // Helpers
    // ==============================
    getPathToIndex(index) {
        const pathToIndex = this.props.pathToIndex.slice(0);
        pathToIndex.push(parseInt(index));
        return pathToIndex;
    }

    // ==============================
    // Renderers
    // ==============================

    renderChildren() {
        var children = [];
    
        if(this.props.data.children != null){
          for(var key in this.props.data.children){
              var item = this.props.data.children[key];
              if(item.type == "col"){
                children.push(
                  <ColContainer
                    key={key}
                    colClass={item.colClass}
                    index={parseInt(key)}
                    data={item}
                    pathToIndex={this.getPathToIndex(key)}
                  />
                );
              }
          }
        }
    
        return children;
      }

    render() {
        const { duplicateButton, removeButton, columnsButton, editButton, childrenLength } = this.props;

        const childrenIndex = this.props.pathToIndex[this.props.pathToIndex.length-1];
        const isWrapper = this.props.data.wrapper !== undefined ? this.props.data.wrapper : false ;

        return (
            <div className="page-row filled">
                <div className="row-container row-container-component">
                    <div className="row-container-header">
                        <div className="left-buttons">
                            <a href="#" className="btn btn-link" onClick={this.handleUp.bind(this)}>
                                <i className="fa fa-arrow-up"></i>
                            </a>

                            {childrenIndex < childrenLength - 1 &&
                            <a href="#" className="btn btn-link" onClick={this.handleDown.bind(this)}>
                                <i className="fa fa-arrow-down"></i>
                            </a>
                            }

                            {columnsButton ?
                                <a href="#" className="btn btn-link" onClick={this.handleColumns.bind(this)}>
                                    <i className="fa fa-columns"></i>
                                </a>
                                : null}
                        </div>
                        <div className="right-buttons">
                            {editButton ?
                                <a href="#" className="btn btn-link" onClick={this.handleEdit.bind(this)}>
                                    <i className="fa fa-pencil-alt"></i>
                                </a>
                                : null}
                            {duplicateButton ?
                                <a href="#" className="btn btn-link" onClick={this.handleDuplicate.bind(this)}>
                                    <i className="far fa-copy"></i>
                                </a>

                                : null}
                            {removeButton ?
                                <a href="#" className="btn btn-link text-danger" onClick={this.handleRemove.bind(this)}>
                                    <i className="fas fa-trash-alt"></i>
                                </a>
                                : null}
                        </div>
                    </div>
                    <div className="row-container-body">
                        <div className="row">
                            <div className="col-xs-12">
                                {this.props.data.children != null &&
                                    <div className="row">
                                        {this.renderChildren()}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        layout: state.template.layout
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // selectItem: (pathToIndex) => {
        //     return dispatch(selectItem(pathToIndex));
        // },
        deleteRow: (pathToIndex,layout) => {
            return dispatch(deleteRow(pathToIndex,layout))
        },
        pullUpItem: (pathToIndex,layout) => {
            return dispatch(pullUpItem(pathToIndex,layout))
        },
        pullDownItem: (pathToIndex,layout) => {
            return dispatch(pullDownItem(pathToIndex,layout))
        },
        // editSettings: (item) => {
        //     return dispatch(editSettings(item))
        // },
        // changeColumns: (pathToIndex, data, layout) => {
        //     return dispatch(changeColumns(pathToIndex,data,layout))
        // },
        // copyItem: (pathToIndex,layout) => {
        //   return dispatch(copyItem(pathToIndex,layout))
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RowContainer);


// RowContainer.propTypes = {

//     editButton: PropTypes.bool,
//     duplicateButton: PropTypes.bool,
//     columnsButton: PropTypes.bool,
//     removeButton: PropTypes.bool,

//     onUp: PropTypes.func,
//     onDown: PropTypes.func,
//     onEdit: PropTypes.func,
//     onDuplicate: PropTypes.func,

//     pathToIndex: PropTypes.string
// };
