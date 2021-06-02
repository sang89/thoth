import './App.css';
import { routes } from './routes';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ThothAppBar from './components/ThothAppBar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ThothAppBar />
          <div className="content">
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
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;