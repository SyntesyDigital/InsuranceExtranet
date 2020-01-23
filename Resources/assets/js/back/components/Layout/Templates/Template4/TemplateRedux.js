import React, { Component } from 'react';

import BarTitle from '../../BarTitle';
import ButtonPrimary from '../../ButtonPrimary';
import ButtonSecondary from '../../ButtonSecondary';
import CollapsableGroup from '../../CollapsableGroup';
import ToggleField from '../../Fields/ToggleField';
import ButtonDropdown from '../../ButtonDropdown';
import {connect} from 'react-redux';

import {
  initState
} from './actions'

class TemplateRedux extends Component {

  constructor(props) {
    super(props);

    this.state = {
      display: false
    };
  }

  componentDidMount() {
    this.props.initState();
  }

  openModal(e) {
    if (e !== undefined) {
      e.preventDefault();
    }

    this.setState({
      display: true
    });
  }

  handleModalClose() {
    this.setState({
      display: false
    });
  }

  render() {
    return (
      <div className="template-4">


        <BarTitle
          icon={'fa fa-file'}
          title={'Pate title'}
          backRoute={'#'}
        >

          <ButtonDropdown
            label={'Actions'}
            list={[
              {
                label: 'Nouveau',
                icon: 'fa fa-plus-circle',
                route: '/architect/contents/page/create',
                className: ''
              },
              {
                label: 'Nouveau',
                icon: 'fa fa-plus-circle',
                route: '/architect/contents/page/create',
                className: 'text-danger'
              }
            ]}
          />

          <ButtonSecondary
            label={'Secondary'}
            icon={'fa fa-plus'}
            onClick={this.openModal.bind(this)}
          />

          <ButtonPrimary
            label={'Sauvegarder'}
            icon={'fa fa-plus'}
          />

        </BarTitle>

        <div className="container rightbar-page">
          <div className="col-md-9 page-content form-fields">
            <CollapsableGroup
              identifier='1'
              title='title'
            >
              
            </CollapsableGroup>

          </div>
          <div className="sidebar">

          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      form: state.form
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initState : () => {
      return dispatch(initState());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateRedux);
