import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'select2/dist/css/select2.min.css';
import 'select2/dist/js/select2.min';
import 'font-awesome/css/font-awesome.min.css';
import './styles/index.css';
import './plugins/app';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
