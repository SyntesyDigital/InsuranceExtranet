import React, { Component } from "react";
import { render } from "react-dom";

import {
    VISIBILITY_HIDE,
    VISIBILITY_SHOW,
    CONDITION_FIELD_TYPE_PARAMETER,
    CONDITION_JOIN_OR,
    OPERATOR_EQUAL,
    OPERATOR_DIFFERENT,
} from "./../../constants";

import ConditionsModal from "./ConditionsModal";

/**
 *   Settings with conditional language to define if field is visible or not
 */
class VisibilitySettingsField extends Component {
    constructor(props) {
        super(props);

        var checkbox = null;
        var value = this.getDefaultVisibilityValue();
        var display = false;

        this.state = {
            checkbox: checkbox,
            value: value,
            display: display,
            modalDisplay: false,
            conditionIndex: null,
            roles: this.getRoles(),
            permissions: this.getPermissions(),
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.visibilityOptions = [
            {
                name: "Invisible",
                value: VISIBILITY_HIDE,
            },
            {
                name: "Visible",
                value: VISIBILITY_SHOW,
            },
        ];
    }

    getPermissions() {
        return Object.keys(CURRENT_USER.veos_permissions).map((key, index) => ({
            name: key,
            value: key,
        }));
    }
    getRoles() {
        return Object.keys(CURRENT_USER.veos_roles).map((key, index) => ({
            name: CURRENT_USER.veos_roles[key],
            value: CURRENT_USER.veos_roles[key],
        }));
    }

    /**
     *   Conditions have by default the opposite default condition, hide or show.
     */
    getConditionalAction() {
        const value = this.state.value;

        if (
            value !== undefined &&
            value != null &&
            value.initialValue !== undefined
        ) {
            for (var key in this.visibilityOptions) {
                if (this.visibilityOptions[key].value != value.initialValue) {
                    return this.visibilityOptions[key];
                }
            }
        }
        return null;
    }

    getConditions() {
        const value = this.state.value;

        if (
            value !== undefined &&
            value != null &&
            value.conditions !== undefined
        ) {
            return value.conditions;
        }
        return [];
    }

    componentDidMount() {
        this.processProps(this.props);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.processProps(nextProps);
    }

    processProps(nextProps) {
        var checkbox = null;
        var value = "";
        var display = false;

        if (
            nextProps.field != null &&
            nextProps.field[nextProps.source] != null &&
            nextProps.field[nextProps.source][nextProps.name] !== undefined
        ) {
            checkbox = nextProps.field[nextProps.source][nextProps.name] != null;
            display = true;

            value =
                nextProps.field[nextProps.source][nextProps.name] == null
                    ? this.getDefaultVisibilityValue()
                    : nextProps.field[nextProps.source][nextProps.name];

            console.log(
                "VisibilitySettingsField :: componentWillRecieveProps",
                nextProps.field[nextProps.source][nextProps.name]
            );
        }

        this.setState({
            checkbox: checkbox,
            value: value,
            display: display,
        });
    }

    getDefaultVisibilityValue() {
        return {
            initialValue: VISIBILITY_HIDE,
            conditions: [],
        };

        /*
          {
            'initialValue' : 'hide',
            'conditions' : [
              {
                'action' : '' //opposite by default
                'join' : 'and/or' //only appear second condition
                'type' : 'parameters',
                'name' : ,
                'operator : '=,!=',
                'options : [],  //list of options
                'values' : [] //selected options
    
              },
    
            ]
          }
        */
    }

    //update state from formated value
    setVisibilityValue(initialValue, conditions) {
        //proces if needed
        return {
            initialValue: initialValue,
            conditions: conditions,
        };
    }

    //get value to process field
    getVisibilityValue() {
        return this.state.value;
    }

    handleFieldChange(event) {
        var field = {
            name: this.props.name,
            source: this.props.source,
            value: event.target.checked ? this.state.value : null,
        };

        this.props.onFieldChange(field);
    }

    handleInputChange(event) {
        const value = this.getVisibilityValue();

        var field = {
            name: this.props.name,
            source: this.props.source,
            value: this.setVisibilityValue(event.target.value, value.conditions),
        };

        this.props.onFieldChange(field);
    }

    renderOptions() {
        return this.visibilityOptions.map((item, i) => (
            <option value={item.value} key={i}>
                {item.name}
            </option>
        ));
    }

    onConditionEdit(index, e) {
        e.preventDefault();

        var self = this;
        this.setState(
            {
                selectedContidion: index,
            },
            function () {
                self.setState({
                    modalDisplay: true,
                });
            }
        );
    }

    onConditionRemove(index, e) {
        e.preventDefault();

        var self = this;

        bootbox.confirm({
            message: "Êtes-vous sûr de supprimer définitivement ce condition",
            buttons: {
                confirm: {
                    label: Lang.get("fields.si"),
                    className: "btn-primary",
                },
                cancel: {
                    label: Lang.get("fields.no"),
                    className: "btn-default",
                },
            },
            callback: function (result) {
                if (result) {
                    var conditions = self.getConditions();

                    conditions.splice(index, 1);

                    //console.log("onConditionRemove :: ",conditions);

                    self.updateConditions(conditions);
                }
            },
        });
    }

    processCondition(condition, index) {
        //"Or show si type_pol = Hola, asdf, sdfsd "
        if (condition === undefined) {
            return null;
        }

        var conditionalAction = this.getConditionalAction();

        return (
            <span>
                {index != 0 && <span>Ou &nbsp;</span>}
                {conditionalAction.name} si <b>{condition.name}</b>
        &nbsp; {this.processOperator(condition.operator)} &nbsp;
                <b>{condition.values}</b>
            </span>
        );
    }

    processOperator(operator) {
        switch (operator) {
            case OPERATOR_EQUAL:
                return "égal";
            case OPERATOR_DIFFERENT:
                return "différent";
        }
    }

    renderConditions() {
        if (this.state.value.conditions === undefined) {
            return null;
        }

        return this.state.value.conditions.map((item, index) => (
            <div className="condition-item row" key={index}>
                <div className="col-sm-9">{this.processCondition(item, index)}</div>
                <div className="col-sm-3 text-right">
                    <a
                        href=""
                        onClick={this.onConditionEdit.bind(this, index)}
                        className=""
                    >
                        <i className="fas fa-pencil-alt" />
                    </a>{" "}
                    &nbsp;
                    <a
                        href=""
                        onClick={this.onConditionRemove.bind(this, index)}
                        className="text-danger"
                    >
                        <i className="fas fa-trash" />
                    </a>
                </div>
            </div>
        ));
    }

    openModal(e) {
        e.preventDefault();

        const value = this.getVisibilityValue();
        value.conditions.push(this.getDefaultConditionValue());

        var self = this;
        this.setState(
            {
                value: value,
                selectedContidion: value.conditions.length - 1,
            },
            function () {
                self.setState({
                    modalDisplay: true,
                });
            }
        );
    }

    getDefaultConditionValue() {
        return {
            join: CONDITION_JOIN_OR,
            type: CONDITION_FIELD_TYPE_PARAMETER,
            name: "",
            operator: OPERATOR_EQUAL,
            values: "",
        };
    }

    handleModalClose() {
        this.setState({
            modalDisplay: false,
            selectedContidion: null,
        });
    }

    handleConditionChange(conditions) {
        //console.log("handleConditionChange :: ",conditions);

        this.updateConditions(conditions);
    }

    updateConditions(conditions) {
        const value = this.state.value;

        value.conditions = conditions;

        var field = {
            name: this.props.name,
            source: this.props.source,
            value: value,
        };

        this.props.onFieldChange(field);
    }

    render() {
        const { checkbox, value } = this.state;

        return (
            <div
                style={{ display: this.state.display ? "block" : "none" }}
                className="visibility-settings-field"
            >
                <ConditionsModal
                    display={this.state.modalDisplay}
                    onModalClose={this.handleModalClose.bind(this)}
                    initialValue={this.getConditionalAction()}
                    conditions={this.getConditions()}
                    conditionIndex={this.state.selectedContidion}
                    onConditionChange={this.handleConditionChange.bind(this)}
                    parameters={this.props.parameters}
                    fields={this.props.fields}
                    permissions={this.state.permissions}
                    roles={this.state.roles}
                />

                <div className="setup-field">
                    <div className="togglebutton">
                        <label>
                            <input
                                type="checkbox"
                                name={this.props.name}
                                checked={this.state.checkbox != null ? checkbox : false}
                                onChange={this.handleFieldChange}
                            />
                            {this.props.label}
                        </label>
                    </div>

                    <div
                        className="setup-field-config"
                        style={{
                            display:
                                this.state.checkbox != null && this.state.checkbox
                                    ? "block"
                                    : "none",
                        }}
                    >
                        <div className="form-group bmd-form-group">
                            <label htmlFor="num" className="bmd-label-floating">
                                {this.props.inputLabel}
                            </label>
                            <select
                                className="form-control"
                                name="default"
                                value={value.initialValue}
                                onChange={this.handleInputChange}
                            >
                                {this.renderOptions()}
                            </select>
                        </div>
                        <div className="form-group bmd-form-group">
                            <label className="bmd-label-floating">
                                Définir les conditions :
              </label>
                        </div>
                        <div className="form-group conditions-list">
                            {this.renderConditions()}
                        </div>
                        <div className="add-row-block">
                            <a
                                href=""
                                className="btn btn-default"
                                onClick={this.openModal.bind(this)}
                            >
                                <i className="fa fa-plus-circle" /> Ajouter une condition
              </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default VisibilitySettingsField;

/*
{
  'initialValue' : 'denied',
  'conditions' : [
    {
      'action' : 'allowed' //opposite by default
      'join' : 'and/or' //por ahora solo usamos or, si se cumple cualquiera de las condiciones funciona.
      'type' : 'link',  //role, right o link
      'name' : '',
      'operator : '=,!=', //igual o diferente
      'values' : "" //valor a cumplir, tipo string-
    },
  ]
}


{
  'initialValue' : 'denied',
  'conditions' : [
    {
      'action' : 'allowed'
      'join' : 'or'
      'type' : 'role',
      'name' : 'hospital',
      'operator : '=',
      'values' : "1"
    },
    {
      'action' : 'allowed'
      'join' : 'or'
      'type' : 'right',
      'name' : 'contents.edit',
      'operator : '=',
      'values' : "1"
    },
    {
      'action' : 'allowed'
      'join' : 'or'
      'type' : 'right',
      'name' : 'contents.remove',
      'operator : '=',
      'values' : "1"
    },
  ]
}

{
  'initialValue' : 'denied',
  'conditions' : [
    {
      'action' : 'allowed'
      'join' : 'or'
      'type' : 'link',
      'name' : '',
      'operator : '',
      'values' : ''
    }
  ]
}




 */
