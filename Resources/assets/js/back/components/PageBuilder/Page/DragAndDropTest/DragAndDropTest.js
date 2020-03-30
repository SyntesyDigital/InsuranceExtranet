import React, {Component} from 'react';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import Container from './Example';


class DragAndDropTest extends Component {

  constructor(props){
    super(props);

  }

  render() {

    return (
      <div className="row">
        <DndProvider backend={Backend}>
          <div className="col-xs-9 empty-item">
            <div className="row">
              <div className="col-xs-6 empty-item">
                Contendor 1 
              </div>
              <div className="col-xs-6 empty-item">
                Contendor 2
              </div>
            </div>
            Test

          </div>
          <div className="col-xs-3 empty-item">
            Sidebar

          </div>

          <Container />

        </DndProvider>
      </div>
    );
  }

}
export default DragAndDropTest;
