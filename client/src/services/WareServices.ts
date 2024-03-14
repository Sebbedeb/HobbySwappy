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
