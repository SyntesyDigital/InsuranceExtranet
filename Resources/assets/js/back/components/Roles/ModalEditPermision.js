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
  savePermission
} from './actions';

const arrayOfOptions = [
  {
    id: '1 - Nico',
    name: 'nico'
  },
  {
    id: '2 - Sergi',
    name: 'sergi'
  },
  {
    id: '3 - Francicso',
    name: 'francisco'
  },
  {
    id: '4 - dani',
    name: 'dani'
  },
];

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
      values: {
        name: '',
        identifier: '',
        group: ''
      },
      groups: props.groups,
      roles: [{
        id: 1,
        identifier: 'admin',
        name: 'Admin',
        value: true
      },
      {
        id: 2,
        identifier: 'client',
        name: 'Client',
        value: false
      }
      ]
    }

  }

  componentDidUpdate(prevProps, prevState) {
    var name = '';
    var identifier = '';
    var group = '';

    if (!prevProps.display && this.props.display) {
      //if we are showing the modal, see if new parameters to setup
      if (this.props.group != null) {
        group = this.props.group.id;
      }
      if (this.props.permission != null) {
        name = this.props.permission.name;
        identifier = this.props.permission.identifier;
      }

      this.setState({
        values: {
          name: name,
          identifier: identifier,
          group: group
        }
      });
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

  // ==============================
  // Renderers
  // ==============================

  renderRoles() {

    if (this.state.roles === undefined || this.state.roles == null)
      return null;

    return this.state.roles.map((item, index) =>
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
        display={this.props.display}
        zIndex={10000}
        
        onModalClose={this.props.cancelEditPermission}
        onCancel={this.props.cancelEditPermission}
        onRemove={this.handleRemove.bind(this)}

        size={this.props.size}
      >

        {selectedPermission != null &&
          <div className="row">
            <div className="col-xs-6 field-col border-right">
              {this.renderRoles()}
            </div>

            <div className="col-xs-6 field-col">
              <InputField
                label={'Name'}
                value={selectedPermission.name}
                name={'name'}
              />
              <InputField
                label={'Identifier'}
                value={selectedPermission.identifier}
                name={'identifier'}
              />
              <SelectField
                arrayOfOptions={arrayOfOptions}
                label={'Group'}
                onSelectChange={this.handleSelectChange.bind(this)}
              />
            </div>
          </div>
        }
      </Modal>
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
    cancelEditPermission: () => {
      return dispatch(cancelEditPermission());
    },
    removePermission: (permission) => {
      return dispatch(removePermission(permission));
  },
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

