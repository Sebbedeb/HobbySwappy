import { gql } from "@apollo/client";


export const GET_WARES = gql`
  query GetWares($categoryId: Int) {
    wares(categoryId: $categoryId) {
        imgName
        wareCategory
        wareDescription
        wareId
        warePrice
        wareTitle    
        userId
    }
  }
`;

export const GET_WARE = gql`
  query GetWare($wareId: Int!) {
    ware(wareId: $wareId) {
        imgName
        wareCategory
        wareDescription
        wareId
        warePrice
        wareTitle
        userId
    }
  }
`;

export const GET_WARES_BY_USER_ID = gql`
  query GetWaresByUserId($userId: Int!) {
    waresByUserId(userId: $userId) {
        imgName
        wareCategory
        wareDescription
        wareId
        warePrice
        wareTitle
        userId
    }
  }
`;

export const EDIT_WARE = gql`
  mutation EditWare($wareId: Int!, $wareTitle: String, $wareDescription: String, $warePrice: Int, $wareCategory: Int, $imgName: String) {
    editWare(wareId: $wareId, wareTitle: $wareTitle, wareDescription: $wareDescription, warePrice: $warePrice, wareCategory: $wareCategory, imgName: $imgName) {
        wareId
        wareTitle
        wareDescription
        warePrice
        wareCategory
        userId
        imgName
    }
  }
`;

export const CREATE_WARE = gql`
  mutation CreateWare($wareTitle: String!, $wareDescription: String!, $warePrice: Int!, $wareCategory: Int!, $userId: Int!, $imgName: String) {
    createWare(wareTitle: $wareTitle, wareDescription: $wareDescription, warePrice: $warePrice, wareCategory: $wareCategory, userId: $userId, imgName: $imgName) {
        wareId
        wareTitle
        wareDescription
        warePrice
        wareCategory
        userId
        imgName
    }
  }
`;

export const DELETE_WARE = gql`
  mutation DeleteWare($wareId: Int!) {
    deleteWare(wareId: $wareId) {
        wareId
    }
  }
`;