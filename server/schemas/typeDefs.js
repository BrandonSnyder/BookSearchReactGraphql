const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    username:String!
    email: String
    password: String
    savedBooks: [Book]
    }

type Book {
    bookId: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
    }

type Auth{
    token: ID!
    user: User
}

input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

type Query {
    me :User
  }

type Mutation{
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password:String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
}`
module.exports = typeDefs;

// Type Mutation Notes:
// similar to the put, post, and delete request of the REST API
