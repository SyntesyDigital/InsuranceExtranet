import React from 'react';
import { render } from 'react-dom';

console.log("hello!")

if (document.getElementById('home')) {

  render(
    <div>
      Hello!
    </div>,
          document.getElementById('home'));
}
