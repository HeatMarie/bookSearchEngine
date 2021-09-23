import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email 
                bookCount
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user {
                _id
                username
                email
                bookCount
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($authors: [String], $bookId: ID, $title: String, $description: String, $image: String, $link: String){
        saveBook(authors: $authors, bookId: $bookId, title: $title, description: $description, image: $image, link: $link) {
            _id
            username
            email
            savedBooks{
                bookId
                authors
                description
                image 
                link
                title
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!){
        removeBook(bookId: $bookId){
            _id
            username
            email
            savedBooks{
                bookId
                authors
                desciption
                image
                link
                title
            }
        }
    }
`;