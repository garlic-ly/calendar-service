import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/app.jsx';

describe('Test for App Component', () => {
  test('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})