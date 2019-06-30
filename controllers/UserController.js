const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

exports.findOrCreateUser = async token => {
  // step-1 Verify auth token
  const googleUser = await verifyAuthToken(token);
  // Step-2 Check if user exists
  const user = await checkifUserExists(googleUser.email);
  //if user exist return user else create new user in db
  return user ? user : createNewUser(googleUser);
};

const verifyAuthToken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID
    });
    return ticket.getPayload();
  } catch (error) {
    console.log(error);
  }
};

const checkifUserExists = async email => await User.findOne({ email }).exec();

const createNewUser = googleUser => {
  const { name, email, picture } = googleUser;
  const user = { name, email, picture };

  return new User(user).save();
};
