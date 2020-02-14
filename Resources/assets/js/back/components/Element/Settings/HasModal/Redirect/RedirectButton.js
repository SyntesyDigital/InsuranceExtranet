
import React, {Component} from 'react';
import RedirectModal from './RedirectModal';
import {connect} from 'react-redux';

import {
  openModalElementRedirect,
  closeModalElementRedirect,
  selectContentElementRedirect
} from './../../../actions/';

class RedirectButton extends Component {

  constructor(props) {
    super(props);

    
  }

  handleModalClose() {
    this.props.closeModalElementRedirect();
  }

  onButtonPressed(event) {
    event.preventDefault();

    this.props.openModalElementRedirect();
  }

  handleContentSelect(content) {

    console.log("RedirectButton : handleContentSelect (content) ",content);

    this.props.selectContentElementRedirect(content);
  }

  render() {

    const content = this.props.elements.content;
    //console.log("RedirectButton :: (content)",content);

    const label = content != null ? 
      content.title : 
      <span><i className="fa fa-plus-circle"></i>&nbsp;Redirection</span>;

    return (
      <div style={{display:'inline-block'}}>
        <RedirectModal
          display={this.props.elements.displayContents}
          onModalClose={this.handleModalClose.bind(this)}
          onContentSelect={this.handleContentSelect.bind(this)}
        />

        <a href="" className="btn btn-default btn-parameters" 
          style={{
            width: 150,
            overflow: 'hidden',
            paddingRight: 10,
            textOverflow: 'ellipsis'
          }}
          onClick={this.onButtonPressed.bind(this)}
        > 
          {label}
        </a>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      elements: state.elements,
      app: state.app
  }
}

const mapDispatchToProps = dispatch => {
  return {
      openModalElementRedirect : () => {
          return dispatch(openModalElementRedirect());
      },
      closeModalElementRedirect : () => {
        return dispatch(closeModalElementRedirect());
      },
      selectContentElementRedirect : (content) => {
        return dispatch(selectContentElementRedirect(content));
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RedirectButton);


