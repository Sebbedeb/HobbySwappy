import { gql } from "@apollo/client";

export const GET_CONVERSATIONS = gql`
    query conversations($userId: Int!) {
        conversations(userId: $userId) {
        conversationId
        personOneId
        personTwoId
        }
    }
`;