import { QueryResolvers } from '../resolvers/query.js';
import { MutationResolvers } from '../resolvers/mutation.js';

const typeDefs = `
  type Query {
    hello: String
    persons: [Person]
    person(id: ID!): Person
    adresses: [Adress]
    adress(id: ID!): Adress
    peopleOnAdress(id: ID!): [Person]
    personByEmail(email: String!): Person
    adressesByZip(zip: String!): [Adress]
  }
  type Mutation {
    createPerson(name: String!, email: String!, age: Int): Person
    createAdress(street: String!, city: String!, zip: String!): Adress
    addPersonToAdress(personId: ID!, adressId: ID!): Person
    removePersonFromAdress(personId: ID!, adressId: ID!): Person
    deletePerson(id: ID!): Person
  }
  type Person {
    id: ID!
    name: String!
    email: String!
    age: Int
    adress: Adress
  }
  type Adress {
    id: ID!
    street: String!
    city: String!
    zip: String!
    persons: [Person]
  }
`;

const resolvers = {
  Query: QueryResolvers.Query,
  Mutation: MutationResolvers.Mutation
};

export { typeDefs, resolvers };
