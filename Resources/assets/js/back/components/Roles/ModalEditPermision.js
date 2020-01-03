import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import Switch from '../Layout/ToggleSwitch';
import Separator from '../Layout/Separator';
import './../../../../sass/backend/layout/_modal-edit-permision.scss';

export default class ModalEditPermision extends Component {

  constructor(props) {

    super(props);

    this.state = {

    };

  }

  render() {
    
    return (

      <Modal
        id={this.props.id}
        icon={this.props.icon}
        title={'Permision | Edit'}
        display={this.props.display}
        zIndex={10000}
        onModalClose={this.props.onModalClose}  
      >
        <div className="row">
          <div className="col-md-6 content-right">
            <h4>ROLES</h4>

            <Switch
              title={'Permiso 1'}

            />

            <Separator />

            <Switch
              title={'Permiso 1'}
            />

            <Separator />

            <Switch
              title={'Permiso 1'}
            />

            <Separator />

            <Switch
              title={'Permiso 1'}
            />

            <Separator />

            <Switch
              title={'Permiso 1'}
            />


          </div>
          <div className="col-md-6">
            <div className={"form-group bmd-form-group "}>
              <label className="bmd-label-floating">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name={'name'}
                placeholder={'placeholder'}
                value={''}
              />
            </div>
            <div className={"form-group bmd-form-group "}>
              <label className="bmd-label-floating">
                Identifier
              </label>
              <input
                type="text"
                className="form-control"
                name={'identifier'}
                placeholder={'placeholder'}
                value={''}
              />
            </div>
            <div className={"form-group bmd-form-group "}>
              <label className="bmd-label-floating">
                Group
              </label>
              <select className="form-control">
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option selected value="coconut">Coconut</option>
                <option value="mango">Mango</option>
              </select>
            </div>
          </div>

        </div>
      </Modal>


    );
  }
}

ModalEditPermision.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  display: PropTypes.bool.isRequired,
  zIndex: PropTypes.number.isRequired
};
