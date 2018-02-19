import { makeExecutableSchema } from 'graphql-tools';
import { getItem, getTopStories, getUser } from './api';



let data = ['hello']

const typeDefs =  /* GraphQL */`
  type Query {
    hello: [String]
  }
  type Mutation {
    addItem(item: String): [String]
  }
`;

const resolvers = {
  Query: {
    hello: () => data
  },
  Mutation: {
    addItem: (_, {item}) => {
      data = [...data, item]
      return data
    }
  }
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default executableSchema;
