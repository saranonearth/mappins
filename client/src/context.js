import { createContext } from 'react';

const Context = createContext({
  currentUser: null,
  isAuthenticated: false,
  draf: null,
  pins: [],
  currentPin: null
});

export default Context;
