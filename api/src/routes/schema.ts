import { QueryResolvers } from '../resolvers/query.js';
import { MutationResolvers } from '../resolvers/mutation.js';


const typeDefs = `
  type Query {
    categories: [Category]
    users: [User]
    wares: [Ware]
    user(userId: Int!): User
    ware(wareId: Int!): Ware
    conversation(senderId: Int!, receiverId: Int!): Conversation
  }
  type Mutation {
    createUser(userName: String!, userPassword: String!, userAdress: String!, userZip: Int!): User
    createWare(wareTitle: String!, wareDescription: String!, warePrice: Int!, wareCategory: String!, userId: Int!): Ware
    sendMessage(messageText: String!, messageSenderId: Int!, messageReceiverId: Int!): Message
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
    messageSender: String
    messageReceiver: String
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
    senderId: Int
    receiverId: Int
    messages: [Message]
  }
`;

const resolvers = {
  Query: QueryResolvers.Query,
  Mutation: MutationResolvers.Mutation
};

export { typeDefs, resolvers };
