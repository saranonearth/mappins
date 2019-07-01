import React, { useContext } from 'react';
import Login from '../components/Auth/Login';
import Context from '../context';
import { Redirect } from 'react-router-dom';
import Tilt from 'react-tilt';
const Splash = () => {
  const { state } = useContext(Context);
  if (state.isAuthenticated) return <Redirect to='/' />;
  return (
    <>
      <Tilt
        className='Tilt'
        options={{ max: 12 }}
        style={{ height: '100%', width: '100%' }}
      >
        <div className='Tilt-inner bg-holder' />
      </Tilt>
      <div className='holder'>
        <Login />
      </div>
    </>
  );
};

export default Splash;
