import { gql } from '@apollo/client';

export const LEADERBOARD = gql`
    query {
        leaderboard {
            timeCount
            turns
            user {
                username
            }
        }
    }
`;

export const LOGGED_USER = gql`
    query {
        currentUser {
            username
        }
    }
`;