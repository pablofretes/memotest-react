import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      username
      id
    }
  }
`;

export const LOG_IN = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const SAVE_SCORE = gql`
  mutation saveScore($timeCount: Int!, $turns: Int!, $difficulty: String!){
    saveScore(timeCount: $timeCount, turns: $turns, difficulty: $difficulty){
      timeCount
      turns
			difficulty
    }
  }
`;