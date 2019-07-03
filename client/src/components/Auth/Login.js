import React, { useContext } from 'react';
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
import Context from '../../context';
import Typography from '@material-ui/core/Typography';
import { ME_QUERY } from '../../graphql/queries';
import { BASE_URL } from '../../client';
const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const onSuccess = async googleUser => {
    const id_token = googleUser.getAuthResponse().id_token;
    try {
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: id_token }
      });

      const data = await client.request(ME_QUERY);

      dispatch({
        type: 'LOGIN_USER',
        payload: data.me
      });
      dispatch({
        type: 'IS_LOGGED_IN',
        payload: googleUser.isSignedIn()
      });
    } catch (error) {
      onFailure(error);
    }
  };
  const onFailure = err => {
    console.log('Error logging in', err);
    dispatch({
      type: 'IS_LOGGED_IN',
      payload: false
    });
  };

  return (
    <div className={classes.root}>
      <Typography
        component='h1'
        variant='h3'
        gutterBottom
        noWrap
        style={{
          color: '#333',
          fontWeight: '900',
          fontSize: '4rem'
        }}
      >
        Mappins.{' '}
      </Typography>
      <GoogleLogin
        clientId='1032915653860-bgf5t0od7maeigpmip8cm5564mr8c5jc.apps.googleusercontent.com'
        isSignedIn={true}
        onSuccess={onSuccess}
        onFailure={onFailure}
        theme='black'
        buttonText='Login with Google'
      />
    </div>
  );
};

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

export default withStyles(styles)(Login);
