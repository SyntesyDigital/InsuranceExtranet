import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import ToggleField from '../Layout/Fields/ToggleField';
import InputField from '../Layout/Fields/InputField';
import SelectField from '../Layout/Fields/SelectField';
import { connect } from 'react-redux';
import {
  cancelEditPermission,
  removePermission,
  savePermission,
  loadPermission
} from './actions';

/**
 *  Esta modal debe autogestionarse, esto quiere decir que cuando haga submit va a
 *  guardar la información del permiso vinculada a todos los roles. 
 *  A parte debe generar un resultado con el valor del permiso para que pueda
 *  actualizar la vista general ( solo si es necesario )
 *  
 *  Acciones : 
 *    - leer cual son los roles y grupos de un permiso en question
 *    - guardar la información del permiso y de los roles, crear o editar.
 *    
 */

class ModalEditPermision extends Component {

  constructor(props) {

    super(props);

    //init values to process this modal
    this.state = {
      permission: {
        id : null,
        name: '',
        identifier: '',
        group: ''
      }
    }

  }

  componentDidUpdate(prevProps, prevState) {
    
    const {display,selectedPermission,selectedGroup} = this.props.modal;

    if (!prevProps.modal.display && display) {
      //if we are showing the modal, see if new parameters to setup
      this.props.loadPermission(selectedPermission);
      
      console.log("selectedPermission => ",selectedPermission);

      if(selectedPermission != null) {
        this.setState({
          permission : selectedPermission
        });
      }
      else {
        //if the group is defined then open from group
        var group = selectedGroup != null ? selectedGroup.id : '';
        
        this.setState({
          permission : {
            id : null,
            name: '',
            identifier: '',
            group: group
          }
        });
      }
    }
  }

  

  // ==============================
  // Handlers
  // ==============================

  handleCancel() {
    console.log("handleCancel Permission");
    this.props.cancelEditPermission();
  }

  handleRemove() {
    console.log("handleRemove Permission");
    this.props.removePermission(this.props.form.selectedPermission);
  }

  handleSelectChange(selectedValue) {
    this.setState({
      selectedValue: selectedValue
    });
  }

  handleRoleChange(role, e) {
    console.log("handleRoleChange :: (e,role)", e, role);
  }

  handleFieldChange(name,value) {
    const permission = this.state.permission;
    permission[name] = value;
    this.setState({
      permission : permission
    });
}

  // ==============================
  // Renderers
  // ==============================

  renderRoles() {

    if (this.props.modal.roles === undefined || this.props.modal.roles == null)
      return null;

    return this.props.modal.roles.map((item, index) =>
      <ToggleField
        key={item.id}
        label={item.name}
        checked={item.value}
        onChange={this.handleRoleChange.bind(this, item)}
      />
    )
  }

  render() {

    const { group, permission, roles, selectedPermission } = this.props.form;

    return (

      <Modal
        id={this.props.id}
        icon={this.props.icon}
        title={'Permision | Edit'}
        display={this.props.modal.display}
        zIndex={10000}
        onModalClose={this.props.cancelEditPermission}
        onCancel={this.props.cancelEditPermission}
        onRemove={this.handleRemove.bind(this)}

        size={this.props.size}
      >
        <div className="row">
          <div className="col-xs-6 field-col border-right">
            {this.renderRoles()}
          </div>

          <div className="col-xs-6 field-col">
            <InputField
              label={'Name'}
              value={this.state.permission.name}
              name={'name'}
              onChange={this.handleFieldChange.bind(this)}
            />
            <InputField
              label={'Identifier'}
              value={this.state.permission.identifier}
              name={'identifier'}
              onChange={this.handleFieldChange.bind(this)}
            />
            <SelectField
              arrayOfOptions={this.props.modal.groups.map((item,index) => {
                return {name : item.name, value : item.id}
              })}
              label={'Group'}
              name={'group'}
              value={this.state.permission.group}
              onChange={this.handleFieldChange.bind(this)}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    form: state.form,
    modal: state.modalPermission
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cancelEditPermission: () => {
      return dispatch(cancelEditPermission());
    },
    removePermission: (permission) => {
      return dispatch(removePermission(permission));
    },
    loadPermission: (permission) => {
      return dispatch(loadPermission(permission));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditPermision);

ModalEditPermision.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  display: PropTypes.bool.isRequired,
  zIndex: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  roles: PropTypes.array.isRequired,
  permission: PropTypes.object,
  group: PropTypes.object,

  onSubmit: PropTypes.func,
  onRemove: PropTypes.func,
  onCancel: PropTypes.func
};

