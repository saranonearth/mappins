const { ApolloServer } = require('apollo-server');
require('dotenv').config();
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolver');
const { findOrCreateUser } = require('./controllers/UserController');
//Conecting mongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('DB Connected');
  })
  .catch(err => {
    console.log(err);
  });

//instance of apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;

      if (authToken) {
        //find or create a user
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (error) {
      console.log(err);
      console.log('Unable to authorize');
    }
    return { currentUser };
  }
});

server.listen().then(({ url }) => {
  console.log(url);
});
