import React from 'react';
import ReactDOM from 'react-dom';
import "rsuite/dist/rsuite.min.css";
import './style.css'
import {StoreProvider} from './Store'
import App from './App';

ReactDOM.render(<StoreProvider><App /></StoreProvider>,document.getElementById('root'));

