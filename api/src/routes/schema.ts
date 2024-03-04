import { QueryResolvers } from '../resolvers/query.js';
import { MutationResolvers } from '../resolvers/mutation.js';

const typeDefs = `
  type Query {
    hello: [String]
  }
  type Mutation {
    helloSomethingElse(something: String!): String
  }
`;

const resolvers = {
  Query: QueryResolvers.Query,
  Mutation: MutationResolvers.Mutation
};

export { typeDefs, resolvers };
