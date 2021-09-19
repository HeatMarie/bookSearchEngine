const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User{
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]!
    }

    type Book {
        bookId: ID
        authors: String
        description: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID! 
        user: User
    }

    type Query {
        users: [User]
        user(username: String): User
        Books(username: String): [Book]
        Book(bookID: ID!): Book
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(authors: [String], bookId: ID, title: String, description: String, image: String, Link: String): User
        removeBook(bookId: ID): User
    }
`;

module.exports = typeDefs;