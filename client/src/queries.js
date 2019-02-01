import { gql } from 'apollo-boost';

// Post Queries
export const GET_POSTS = gql`
    query {
        getPosts {
            _id
            title
            imageUrl
        }
    }
`;

// User Queries
