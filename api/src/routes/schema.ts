import { QueryResolvers } from '../resolvers/query.js';
import { MutationResolvers } from '../resolvers/mutation.js';


const typeDefs = `
  type Query {
    categories: [Category]
    users: [User]
    wares: [Ware]
    user(userId: Int!): User
    ware(wareId: Int!): Ware
    conversation(conversationId: Int!): Conversation
    conversations(userId: Int!): [Conversation]
  }
  type Mutation {
    createUser(userName: String!, userPassword: String!, userAdress: String!, userZip: Int!): User
    createWare(wareTitle: String!, wareDescription: String!, warePrice: Int!, wareCategory: String!, userId: Int!): Ware
    sendMessage(messageText: String!, messageSenderId: Int!, messageReceiverId: Int!): Message
    editUser(userId: Int!, userName: String, userAdress: String, userZip: Int): User
  }

  type Category {
    categoryId: Int
    categoryName: String
    categoryDescription: String
  }
  type User {
    userId: Int
    userName: String
    userPassword: String
    userAdress: String
    userZip: Int
  }
  type Message {
    messageId: Int
    messageText: String
    messageDate: String
    senderId: Int
    receiverId: Int
  }
  type Ware {
    wareId: Int
    wareTitle: String
    wareDescription: String
    warePrice: Int
    wareCategory: Category
    User: User
  }
  type Conversation {
    conversationId: Int
    personOneId: Int
    personTwoId: Int
    messages: [Message]
  }
`;

const resolvers = {
  Query: QueryResolvers.Query,
  Mutation: MutationResolvers.Mutation
};

export { typeDefs, resolvers };
