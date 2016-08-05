import 'babel-polyfill'
const tredux = require('tredux');
require('reducers/index');
// Application entrypoint.
// Load up the application styles
require("../styles/application.scss");
// Render the top-level React component
import React from 'React';
import ReactDOM from 'React-dom';

import App from './containers/App.jsx'

ReactDOM.render(tredux.mount(<App />), document.getElementById('react-root'));



