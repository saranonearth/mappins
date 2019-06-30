import React from 'react';
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
// import Typography from "@material-ui/core/Typography";
const ME_QUERY = `
{
  me{
    _id
    name
    email
    picture
  }
}
`;
const Login = ({ classes }) => {
  const onSuccess = async googleUser => {
    const id_token = googleUser.getAuthResponse().id_token;

    const client = new GraphQLClient('http://localhost:4000/graphgl', {
      headers: { authorization: id_token }
    });

    const data = await client.request(ME_QUERY);
    console.log(data);
  };

  return (
    <GoogleLogin
      clientId='1032915653860-bgf5t0od7maeigpmip8cm5564mr8c5jc.apps.googleusercontent.com'
      isSignedIn={true}
      onSuccess={onSuccess}
    />
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
