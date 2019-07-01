import React, { useContext } from 'react';
import withRoot from '../withRoot';
import Context from '../context';
import Header from '../components/Header';
import Map from '../components/Map';

const App = () => {
  const { state } = useContext(Context);
  return (
    <>
      <Header />
      <Map />
    </>
  );
};

export default withRoot(App);
