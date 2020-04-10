import React, {Component} from 'react';
import { render } from 'react-dom';



class SettingsPreview extends Component {

  constructor(props){
    super(props);

  }

  getConfiguration(field) {
			var configured = false;
			var visible = false;

			if(field.settings != null){
				for(var key in field.settings){
					if(field.settings[key] != null && field.settings[key] != false){
						configured = true;
						if(key == "conditionalVisibility" || key == "hiddenFilter" ){
							visible = true;
						}
					}
				}
			}

			return {
				configured : configured,
				visible : visible
			}
	}

  render() {
    const field = this.props.field;

    if(field === undefined || field == null)
      return null;

    var configuration = this.getConfiguration(field);

    return (
      <span className="text-success preview-icons">
        {/*
        {configuration.configured &&
          <i className="fas fa-cog"></i>
        }
        */}
        {configuration.visible &&
          <i className="fas fa-eye"></i>
        }

      </span>
    );


  }

}
export default SettingsPreview;
