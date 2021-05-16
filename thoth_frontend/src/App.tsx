import './App.css';
import React from 'react';
import { routes } from './routes';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ThothDashboard } from './components/ThothDashboard';
import axios from 'axios';

const App = () => {

  return (
    <>
      <ThothDashboard>
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
      </ThothDashboard>
    </>
  );
}

export default App;