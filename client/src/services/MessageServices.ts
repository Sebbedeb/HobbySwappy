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

export const SEND_MESSAGE = gql`
mutation SendMessage($messageText: String!, $messageSenderId: Int!, $messageReceiverId: Int!) {
  sendMessage(messageText: $messageText, messageSenderId: $messageSenderId, messageReceiverId: $messageReceiverId) {
    messageId
    messageText
    messageDate
    senderId
    receiverId
  }
}
`;


