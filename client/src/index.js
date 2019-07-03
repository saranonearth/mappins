import React, { useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Context from './context';
import App from './pages/App';
import Splash from './pages/Splash';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as serviceWorker from './serviceWorker';
import reducer from './reducer';
import PrivateRoute from './PrivateRoute';
import './index.css';

//realtime
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  option: {
    reconnect: true
  }
});

console.log(wsLink);

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache()
});
console.log(client);

const Root = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Router>
      <ApolloProvider client={client}>
        <Context.Provider value={{ state, dispatch }}>
          <Switch>
            <PrivateRoute exact path='/' component={App} />
            <Route path='/login' component={Splash} />
          </Switch>
        </Context.Provider>
      </ApolloProvider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
