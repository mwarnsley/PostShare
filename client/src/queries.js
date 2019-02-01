import { gql } from 'apollo-boost';

/************ Post Queries *************/
export const GET_POSTS = gql`
    query {
        getPosts {
            _id
            title
            imageUrl
        }
    }
`;

/** User Queries */

/************ User Mutations **********/

/**
 * Mutation to signin the user
 * @param { username } String required as the username
 * @param { password } String required as the users password
 * returns a token back to the frontend
 */
export const SIGNIN_USER = gql`
    mutation($username: String!, $password: String!) {
        signinUser(username: $username, password: $password) {
            token
        }
    }
`;

/**
 * Mutation to signing up the user
 * @param { username } String required as the username
 * @param { email } String requried as the users email when signing up
 * @param { password } String required as the users password
 * returns a token back to the frontend
 */
export const SIGNUP_USER = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        signinUser(username: $username, email: $email, password: $password) {
            token
        }
    }
`;