import React, {Component} from 'react';
import { render } from 'react-dom';


class LabelField extends Component
{
  constructor(props)
  {
    super(props);
  }

  render() {

    const {field} = this.props;
    
    return (
      
        <div className="row element-form-row label-field">
          <div className="col-sm-12">
            {field.name}
          </div>
        </div>
    );
  }

}

export default LabelField;
