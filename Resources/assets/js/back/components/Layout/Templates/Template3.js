import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import BarTitle from '../BarTitle';
import ButtonPrimary from '../ButtonPrimary';
import ButtonSecondary from '../ButtonSecondary';
import Separator from '../Separator';
import CollapsableGroup from '../CollapsableGroup';
import FieldList from '../FieldList';
import FieldListItem from '../FieldListItem';
import Modal from '../Modal';

export default class Template3 extends Component {

    constructor(props){
      super(props);

      this.state = {
        display : false
      };

    }

    openModal(e) {
      if(e !== undefined){
        e.preventDefault();
      }

      this.setState({
        display : true
      });
    }

    handleModalClose() {
      this.setState({
        display : false
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
                    />

                  </FieldList>


                </div>
                <div className="sidebar">


                  {/* TODO add this label to
                    Component
                    <SidebarTitle
                      label={'CHECKBOX GROUP'}
                    />
                    */}
                  <label className="bmd-label-floating">
                    CHECKBOX GROUP
                  </label>

                  {/* TODO Componente
                    Implemente this toggle button to component
                    <ToggleField
                      label={'Label'}
                      name={'name'}
                      checked={true}
                      disabled={false}
                    />
                    */}
                  <div className="togglebutton">
                      <label>
                        Label
                        <input type="checkbox" name="name" checked={false} disabled={true} />
                      </label>
                  </div>

                  <div className="togglebutton">
                      <label>
                        Label 2
                        <input type="checkbox" name="name" checked={true} disabled={true} />
                      </label>
                  </div>

                  <div className="togglebutton">
                      <label>
                        Label 3
                        <input type="checkbox" name="name" checked={true} disabled={false} />
                      </label>
                  </div>

                  <hr/>

                  {/*
                      TODO implemente this in component
                      <SelectField
                        label={"Select label"}
                        id={'parent_id'}
                        options={[
                          {name="---","value=""},
                          {name="Option 1","value="1"}
                        ]}
                      />
                  */}
                  <div className="form-group bmd-form-group sidebar-item">
                      <label htmlFor="parent_id" className="bmd-label-floating">
                        Select label
                      </label>

                     <select className="form-control" id="parent_id" name="parent_id" value={'1'} >
                          <option value="">---</option>
                          <option value="1">Option 1</option>
                     </select>
                  </div>

                  {/*
                    TODO implement to component
                    <TextField
                      label={'Field label'}
                      id={''}
                      name={'Name'}
                      placeholder={'placeholder'}
                    />
                  */}
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
