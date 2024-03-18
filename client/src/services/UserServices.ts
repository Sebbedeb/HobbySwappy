import { gql } from '@apollo/client';

export const GET_USER = gql`
  query user($userId: Int!) {
    user(userId: $userId) {
      userId
      userName
      userAddress
      userZip
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($userId: Int!, $userName: String, $userAddress: String, $userZip: Int) {
    editUser(userId: $userId, userName: $userName, userAddress: $userAddress, userZip: $userZip) {
      userId
      userName
      userAddress
      userZip
    }
  }
`;

export const GET_USERS = gql`
  query users {
    users {
      userId
      userName
      userAddress
      userZip
    }
  }
`;