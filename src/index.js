import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/eco-systems/app';
import * as serviceWorker from './serviceWorker';
const root = document.getElementById('root')
ReactDOM.render(<App unMount={()=>ReactDOM.unmountComponentAtNode(root)}/>, root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();


