import React, {Component} from 'react';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {connect} from 'react-redux';

import ContentBar from './../Content/ContentBar';
import ContentSidebar from './../Content/ContentSidebar';
import PageBuilder from './PageBuilder';

import {
  initPageState
} from './../actions/';

/*
import PageBuilder from './PageBuilder';
import moment from 'moment';
import axios from 'axios';

import LayoutSelectModal from './LayoutSelectModal';
*/

class PageContainer extends Component {

  constructor(props) {
     super(props);

     //console.log("props.app => ", props.app.content);
     this.props.initPageState(props.app.content);
   }

  render() {

    return (
      <div>
        <ContentBar />

        <div className="container rightbar-page content">
          <ContentSidebar />

          <DragDropContextProvider backend={HTML5Backend}>

            <PageBuilder />

          </DragDropContextProvider>

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
        initPageState: (content) => {
            return dispatch(initPageState(content));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
