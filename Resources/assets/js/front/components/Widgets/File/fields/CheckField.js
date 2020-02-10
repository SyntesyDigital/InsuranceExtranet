import React, {Component} from 'react';
import { render } from 'react-dom';


class CheckField extends Component
{
  constructor(props)
  {
    super(props);
   
  }

  getConfig() {
    var config = {
      checked : 1,
      unchecked : 0
    };

    var field = this.props.field;

    if(field.settings.booleanValues !== undefined && 
      field.settings.booleanValues != null){
        config = field.settings.booleanValues;
    }

    return config;
  }

  getConfigValue(value) {
    var config = this.getConfig();

    console.log("getConfigValue :: (field,config,value) ",this.props.field,config,value);

    if(config.checked == value){
      return true;
    }
    else {
      return false;
    }
  }

  render() {

    const {field,name,value} = this.props;

    const checked = this.getConfigValue(value);

    return (
      <div className="element-file-input-container">
        <div className="col-xs-2 col-md-2 element-file-title" style={{paddingTop: 4}}>
          {checked && 
            <i className="fas fa-check-square"></i>
          }
          {!checked && 
            <i className="far fa-square"></i>
          }
        </div>

        <div className="col-xs-10 col-md-10 element-file-content">
          {name}
        </div>
      </div>
    );
  }

}

export default CheckField;
