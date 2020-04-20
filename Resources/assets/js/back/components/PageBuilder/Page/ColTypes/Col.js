import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import Row from './../RowTypes/Row';
import EmptyItem from './../EmptyItem';
import PageItem from './../PageItem';

import {
  selectItem,
  editSettings,
  itemSelected,
  deletePageItem
} from './../../actions/';

import {
  ITEM_POSITION_BEFORE,
  ITEM_POSITION_AFTER
} from './../../constants/';


class Col extends Component {

  constructor(props){
    super(props);

    //console.log("Col :: props => ",props);

  }

  getPathToIndex(index) {
    const pathToIndex = this.props.pathToIndex.slice(0);
    pathToIndex.push(parseInt(index));
    return pathToIndex;
  }

  handleFieldAdded(field) {

    var item = {
      type : field.element_id ? 'element_field' : 'item',
      field : field
    };

    console.log("handleFieldAdded :: (field,this.props.pathToIndex)",field,this.props.pathToIndex)

    if(field.pathToIndex !== undefined){
      //remove item
      this.props.deletePageItem(
        field.pathToIndex,
        this.props.app.layout
      );
    }

    //add item
    this.props.itemSelected(
      item,
      this.props.pathToIndex,
      ITEM_POSITION_AFTER,
      this.props.app.layout
    );

  }

  renderChildren() {

    var children = [];

    var key = 0;

    if(this.props.data.children != null && this.props.data.children !== undefined &&
       this.props.data.children.length > 0){
      for(key in this.props.data.children){
          var item = this.props.data.children[key];
          if(item.type == "row"){
            children.push(
              <Row
                key={key}
                index={parseInt(key)}
                childrenLength={this.props.data.children.length}
                data={item}
                pathToIndex={this.getPathToIndex(key)}
              />
            );
          }
          else if(item.type == "item" || item.type == "element_field"){
            children.push(
              <PageItem
                key={key}
                childrenLength={this.props.data.children.length}
                data={item}
                pathToIndex={this.getPathToIndex(key)}
              />
            );
          }
      }
    }
    
    children.push(
      <EmptyItem
        key={key + 1}
        index={0}
        onSelectItem={this.onSelectItem.bind(this)}
        onFieldAdded={this.handleFieldAdded.bind(this)}
        pathToIndex={this.props.pathToIndex}
      />
    );

    return children;
  }

  onSelectItemAfter(e) {
    e.preventDefault();

    this.props.selectItem(
      this.props.pathToIndex,
      ITEM_POSITION_AFTER
    );
  }

  onSelectItemBefore(e) {
    e.preventDefault();

    this.props.selectItem(
      this.props.pathToIndex,
      ITEM_POSITION_BEFORE
    );
  }

  onEditClass(e) {
    e.preventDefault();

    this.props.editSettings(this.props);
  }

  onSelectItem(pathToIndex) {
    this.props.selectItem(pathToIndex);
  }

  render() {

    const childrenLength = this.props.data.children != null && this.props.data.children !== undefined &&
       this.props.data.children.length > 0 ? this.props.data.children.length : 0;

    return (

      <div className={this.props.colClass}>
        <div className="row-container-body-content">

          {!architect.currentUserHasRole(ROLES['ROLE_ADMIN']) &&
            <div className="row-container-body-top">

              {childrenLength > 0 &&
                <a href="" className="btn btn-link" onClick={this.onSelectItemBefore.bind(this)}>
                  <i className="fa fa-plus"></i>
                </a>
              }
              &nbsp;&nbsp;
              <a href="" className="btn btn-link" onClick={this.onEditClass.bind(this)}>
                <i className="fa fa-pencil-alt"></i>
              </a>
            </div>
          }
          {architect.currentUserHasRole(ROLES['ROLE_ADMIN']) &&
            <div className="row-container-body-top"></div>
          }


            {this.renderChildren()}


          {!architect.currentUserHasRole(ROLES['ROLE_ADMIN']) &&
            <div className="row-container-body-bottom">
              {/*
              {childrenLength > 0  &&
                <a href="" className="btn btn-link" onClick={this.onSelectItemAfter.bind(this)}>
                  <i className="fa fa-plus"></i>
                </a>
              }
              */}
            </div>
          }

        </div>
      </div>


    );
  }

}

const mapStateToProps = state => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectItem: (pathToIndex,position) => {
            return dispatch(selectItem(pathToIndex,position));
        },
        editSettings: (item) => {
            return dispatch(editSettings(item))
        },
        itemSelected: (item,pathToIndex,position,layout) => {
          return dispatch(itemSelected(item,pathToIndex,position,layout))
        },
        deletePageItem: (pathToIndex,layout) => {
          return dispatch(deletePageItem(pathToIndex,layout))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Col);
