import React, {Component} from 'react';
import { render } from 'react-dom';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper'


/*
import ElementModal from './ElementModal';
*/

import ElementDropZone from './ElementDropZone';
import ElementDragField from './ElementDragField';
import ElementBar from './ElementBar';
import ElementSidebar from './ElementSidebar';

import axios from 'axios';

class ElementContainer extends Component {

  constructor(props) {
     super(props);


     this.state = {
         model : null,
         inputs: {
             name: "",
             identifier: "",
             icon: ""
         },
         errors: {
             name: null,
             identifier: null,
             fields: null,
         },
         fields: [],
         settingsField: null,
         fieldsList: props.fieldsList
     };

     this.handleInputChange = this.handleInputChange.bind(this);
     this.moveField = this.moveField.bind(this);
     this.handleRemoveField = this.handleRemoveField.bind(this);
     this.handleFieldChange = this.handleFieldChange.bind(this);
     this.handleFieldAdded = this.handleFieldAdded.bind(this);
     this.handleOpenSettings = this.handleOpenSettings.bind(this);
     this.handleModalClose = this.handleModalClose.bind(this);
     this.handleSettingsChanged = this.handleSettingsChanged.bind(this);
     this.handleSubmitForm = this.handleSubmitForm.bind(this);
     this.onSaveError = this.onSaveError.bind(this);
     this.delete = this.delete.bind(this);
 }

  handleOpenSettings(fieldId) {

     const {
         fields
     } = this.state;

     for (var i = 0; i < fields.length; i++) {
         if (fieldId == fields[i].id) {
             this.setState({
                 settingsField: fields[i]
             });
         }
     }

     $("#settings-modal").css({
         display: "block"
     });
     TweenMax.to($("#settings-modal"), 0.5, {
         opacity: 1,
         ease: Power2.easeInOut
     });

  }


  handleSettingsChanged(field) {

     const settingsField = this.state.settingsField;

     settingsField[field.source][field.name] = field.value;

     const {fields} = this.state;

     if(field.name == "entryTitle" && field.value == true){
       for(var key in fields){
         var tempField = fields[key];
         if(tempField.settings != null && tempField.settings.entryTitle !== undefined){
           if(tempField.settings.entryTitle &&
             tempField.identifier != this.state.settingsField.identifier ){
             //reset value
             fields[key].settings.entryTitle = false;
           }
         }
       }
     }

     this.setState({
         fields : fields,
         settingsField: settingsField
     });
  }


  handleModalClose(e) {

     e.preventDefault();

     const {
         fields
     } = this.state;
     const settingsField = this.state.settingsField;

     for (var i = 0; i < fields.length; i++) {
         if (settingsField.id == fields[i].id) {
             fields[i] = settingsField;
             break;
         }
     }

     var self = this;

     TweenMax.to($("#settings-modal"), 0.5, {
         display: "none",
         opacity: 0,
         ease: Power2.easeInOut,
         onComplete: function() {
             self.setState({
                 settingsField: null,
                 fields: fields
             })
         }
     });

  }



  renderFields() {

  var result = null;

  if(this.state.fieldsList){

    result = this.state.fieldsList.map((item,i) =>
      <ElementDragField definition={item} key={i}/>
    )
  }

  return result;
  }


  render() {

    return (
      <div id="model-container">

      <ElementBar
        icon={this.state.inputs.icon}
        name={this.state.inputs.name}
        onSubmitForm={this.handleSubmitForm}
      />

      <DragDropContextProvider backend={HTML5Backend}>

        <div className="container rightbar-page">

          {/*
          <ElementModal
            field={this.state.settingsField}
            id="settings-modal"
            onModalClose={this.handleModalClose}
            onSettingsFieldChange={this.handleSettingsChanged}
          />
          */}

            <div className="col-md-9 page-content">
              {
              <ElementDropZone
                errors={this.state.errors}
                created={this.state.model !== undefined && this.state.model != null}
                fields={this.state.fields}
                onFieldAdded={this.handleFieldAdded}
                onFieldChanged={this.handleFieldChange}
                moveField={this.moveField}
                onRemoveField={this.handleRemoveField}
                //onSettingsFieldChange={this.handleSettingsChanged}
                //onOpenSettings={this.handleOpenSettings}
              />
              }
            </div>


            <ElementSidebar
                fields={this.state.inputs}
                errors={this.state.errors}
                onFieldChange={this.handleInputChange}
                deleteHandler={this.delete}
                translations={this.props.translations}
            >

            {this.renderFields()}

            </ElementSidebar>

        </div>
      </DragDropContextProvider>


      </div>
  );
  }

}


export default ElementContainer;
