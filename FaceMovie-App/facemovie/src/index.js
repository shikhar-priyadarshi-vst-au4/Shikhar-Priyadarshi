import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/App';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Movie } from './components/Movie';
import { TVShow } from './components/TVShow';

const ErrorStyle = {
  margin : '8em 40em',
  border : '2px solid #272727',
  textAlign : 'center',
  padding : '1em 2em',
  letterSpacing : '0.1em'
}

ReactDOM.render(
    <Router>
      <Switch>
        <Route path = "/" component={App}  exact />
        <Route path = "/Movie/:MovieId" component = {Movie}/>
        <Route path = "/TVShow/:TVShowId" component = {TVShow} />
        <Route path = "*" render = {()=><div style={ErrorStyle}>Error!Page not found</div>}/>
      </Switch>
     
    </Router>
    
    ,
  document.getElementById('root')
);

