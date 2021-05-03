import './App.css';
import ThothButton from './components/ThothButton';
import ThothTextField from './components/ThothTextField';
import ThothAppBar from './components/ThothAppBar';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { routes } from './routes';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const App = () => {
  
  return (
    <BrowserRouter>
      <Switch>
          {
            routes.map(route => {
              return (
                <Route
                  key = { route.path }
                  exact = { route.exact }
                  path = { route.path }
                  component = { route.component } 
                />
              );
            })
          }
          <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
