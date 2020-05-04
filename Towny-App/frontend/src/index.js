import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { configureStore } from './Store/index'
import  App  from './Components/App';
import './index.css';

ReactDOM.render(
            < Provider store = { configureStore() } > 
                  <Router>
                
                  < App />
                  
                  </Router>
            </ Provider > , document.getElementById('root'));

