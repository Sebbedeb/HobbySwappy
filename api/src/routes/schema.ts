import { QueryResolvers } from '../resolvers/query.js';
import { MutationResolvers } from '../resolvers/mutation.js';

const typeDefs = `
type Query {
  categories: [Category]
  users: [User]
  wares(categoryId: Int): [Ware]
  user(userId: Int!): User
  ware(wareId: Int!): Ware
  conversation(conversationId: Int!): Conversation
  conversations(userId: Int!): [Conversation]
  messages(conversationId: Int!): [Message]
  waresByUserId(userId: Int!): [Ware]
}

type Mutation {
  createUser(userName: String!, userPassword: String!, userAddress: String!, userZip: Int!): User
  createWare(wareTitle: String!, wareDescription: String!, warePrice: Int!, wareCategory: Int!, userId: Int!, imgName: String): Ware
  sendMessage(messageText: String!, messageSenderId: Int!, messageReceiverId: Int!): Message
  editUser(userId: Int!, userName: String, userAddress: String, userZip: Int): User
  createCategory(categoryName: String!, categoryDescription: String!): Category
  login(userName: String!, userPassword: String!): UserCredentials
  editWare(wareId: Int!, wareTitle: String, wareDescription: String, warePrice: Int, wareCategory: Int, imgName: String): Ware
  deleteWare(wareId: Int!): Ware
}

type UserCredentials {
  token: String
  userId: Int
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
  userAddress: String
  userZip: Int
  wares: [Ware]
}

type Ware {
  wareId: Int
  wareTitle: String
  wareDescription: String
  warePrice: Int
  wareCategory: Int
  userId: Int
  imgName: String
}

type Message {
  messageId: Int
  messageText: String
  messageDate: String # Represented in ISO 8601 format
  senderId: Int
  receiverId: Int
}

type Conversation {
  conversationId: Int
  personOneId: Int
  personTwoId: Int
  messages: [Int]
}


`;


const resolvers = {
  Query: QueryResolvers.Query,
  Mutation: MutationResolvers.Mutation
};

export { typeDefs, resolvers };
