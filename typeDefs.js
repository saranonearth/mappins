const { gql } = require('apollo-server');

module.exports = gql`
  type User { #object type
    _id: ID
    name: String
    email: String
    picture: String
  }
  type Pin { #object type
    _id: ID
    createdAt: String
    title: String
    content: String
    image: String
    latitude: Float
    longitude: Float
    author: User
    comments: [Comment]
  }

  type Comment { #object type
    text: String
    createdAt: String
    author: User
  }

  type Query { #rootQuery
    me: User
  }

  input CreatePinInput {
    title: String
    image: String
    content: String
    latitude: Float
    longitude: Float
  }

  type Mutation {
    createPin(input: CreatePinInput!): Pin
  }
`;
