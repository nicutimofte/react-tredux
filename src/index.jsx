import 'babel-polyfill'

// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");
// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
const tredux=require('tredux');
import App from './containers/App.jsx'


ReactDOM.render(tredux.mount(<App />), document.getElementById('react-root'));

