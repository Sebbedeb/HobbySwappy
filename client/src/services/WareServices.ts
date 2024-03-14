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

