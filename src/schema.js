import { makeExecutableSchema } from 'graphql-tools';
import { getItem, getTopStories } from './api';


const typeDefs = `
  # the schema allows the following query:
  type Query {
    topStories: [Story]
    story(id: ID!): Story
  }

  # represent Story
  type Story {
    id: ID!,
    title: String,
    url: String,
    comments: [Comment]
  }

  # represent Comment
  type Comment {
    id: ID!,
    text: String,
    comments: [Comment]
  }

`;

const resolvers = {
  Query: {
    topStories: async () => {
      let list = await getTopStories()
      list = list.slice(0, 10);
      return list.map( id => getItem(id))
    },
    story: (_, {id}) => getItem(id)
  },
  Story: {
    comments: (story) => {
      let kids = story.kids || []
      return kids.map(id => getItem(id))
    }
  },
  Comment: {
    comments: (comment) => {
      let kids = comment.kids || []
      return kids.map(id => getItem(id))
    }
  }
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default executableSchema;
