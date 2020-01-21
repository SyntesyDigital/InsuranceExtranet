import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import BarTitle from '../BarTitle';
import ButtonPrimary from '../ButtonPrimary';
import ButtonSecondary from '../ButtonSecondary';
import CollapsableGroup from '../CollapsableGroup';
import FieldList from '../FieldList';
import FieldListItem from '../FieldListItem';
import Modal from '../Modal';
import ToggleField from '../Fields/ToggleField';
import ButtonDropdown from '../ButtonDropdown';

export default class Template3 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      display: false
    };

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
      <div className="template-3">


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
              <ButtonPrimary
                label={'Sauvegarder'}
                icon={'fa fa-plus'}
              />
            </CollapsableGroup>


            <FieldList>

              <FieldListItem
                icon={'fa fa-file'}
                label={'Name'}
                identifier={'id'}
              >
                <div className="row">
                  <div className="field-name col-xs-6">
                    <input type="text" className="form-control" name="name" placeholder="Nom" value={this.props.name} onChange={this.handleChange} />
                  </div>
                  <div className="field-name col-xs-6">
                    <input disabled type="text" className="form-control" name="identifier" placeholder="Idenfiticador" value={this.props.identifier} onChange={this.handleChange} />
                  </div>
                </div>
              </FieldListItem>

              <FieldListItem
                icon={'fas fa-bars'}
                label={''}
                identifier={'id'}
                icons={[
                  'fas fa-cog'
                ]}
              >
                <div className="row">
                  <div className="col col-xs-6 text-left">
                    Name
                          </div>
                  <div className="col col-xs-6 text-left">
                    Service
                          </div>
                </div>
              </FieldListItem>
            </FieldList>


          </div>
          <div className="sidebar">

            <ToggleField
              title="Label"
            />

            <hr />

          </div>
        </div>

        {/* Modal */}
        <Modal
          id={'modal-id'}
          icon={'fa fa-file'}
          title={'Modal title'}
          display={this.state.display}
          zIndex={10000}
          onModalClose={this.handleModalClose.bind(this)}
        >
          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <div className={"form-group bmd-form-group "}>
                <label className="bmd-label-floating">
                  Field label
                        </label>
                <input
                  id={''}
                  type="text"
                  className="form-control"
                  name={'Name'}
                  placeholder={'placeholder'}
                  value={''}
                />
              </div>
            </div>
          </div>
        </Modal>



      </div>
    );
  }
}

if (document.getElementById('template-3')) {
  ReactDOM.render(<Template3 />, document.getElementById('template-3'));
}
