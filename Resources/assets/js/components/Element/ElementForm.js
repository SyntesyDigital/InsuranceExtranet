import React, {Component} from 'react'
import {connect} from 'react-redux';

import {initState} from './actions/';

import ElementContainer from './ElementContainer';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper'

import ElementSidebar from './ElementSidebar';
import ElementDropZoneContainer from './ElementDropZoneContainer';

import ElementDragField from './ElementDragField';
import ElementBar from './ElementBar';
import ElementModal from './ElementModal';
import ModalContents from './Contents/ModalContents';
import ModalParameters from './Parameters/ModalParameters';


class ElementForm extends Component {

    constructor(props) {
      super(props);

      console.log("parameters list =>",props.parametersList);

			//init redux state with component parameters
			var data = {
				element : props.element ? JSON.parse(atob(props.element)) : null,
        fields : props.fields ? JSON.parse(atob(props.fields)) : [],
				model : props.model ? JSON.parse(atob(props.model)) : null,
				fieldsList :  props.fields ? JSON.parse(atob(props.fields)) : [],
        wsModelIdentifier :  props.wsModelIdentifier ? props.wsModelIdentifier : null,
        wsModel :  props.wsModel ? props.wsModel : null,
        wsModelFormat :  props.wsModelFormat ? props.wsModelFormat : null,
        wsModelExemple :  props.wsModelExemple ? props.wsModelExemple : null,
        elementType :  props.elementType ? props.elementType : null,
        parametersList: props.parametersList ? JSON.parse(atob(props.parametersList)) : [],
        parameters: props.parameters ? JSON.parse(atob(props.parameters)) : [],

			};

      console.log("Data => ",data);

			this.props.initState(data);

			//TODO if element != '' fill fields

    }

		renderFields() {

		  var result = null;

			//console.log("renderFields => ",this.props.app);

		  if(this.props.app.fieldsList){

		    result = this.props.app.fieldsList.map((item,i) =>
		      <ElementDragField definition={item} key={i}/>
		    )
		  }

		  return result;

	  }

    render() {

      console.log("\n\nElementForm :: render!");

      return (
				<div id="model-container">

          <ElementBar />

	  			<DragDropContextProvider backend={HTML5Backend}>
            <div className="container rightbar-page">

              <ElementModal />

              <ModalContents />

              <ModalParameters />

              <div className="col-md-9 page-content">
                {
                <ElementDropZoneContainer />
                }
              </div>

  						<ElementSidebar>

  						{this.renderFields()}

              </ElementSidebar>

            </div>
	        </DragDropContextProvider>

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
        initState: (payload) => {
            return dispatch(initState(payload));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementForm);
