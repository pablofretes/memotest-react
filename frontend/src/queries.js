import { gql } from '@apollo/client';

export const LEADERBOARD = gql`
    query {
        leaderboard {
            timeCount
            turns
        }
    }
`;

export const LOGGED_USER = gql`
    query {
        currentUser
    }
`;