import { createContext } from 'react';

const Context = createContext({
  currentUser: null,
  isAuthenticated: false,
  draf: null
});

export default Context;
