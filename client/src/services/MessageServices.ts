import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
query Query($conversationId: Int!) {
  messages(conversationId: $conversationId) {
    messageId
    messageText
    messageDate
    senderId
    receiverId
  }
}
`;