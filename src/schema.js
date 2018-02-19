import { makeExecutableSchema } from 'graphql-tools';
import { getItem, getTopStories, getUser } from './api';


const typeDefs =  /* GraphQL */`
  # the schema allows the following query:
  type Query {
    topStories(first: Int): [Story]
    story(id: ID!): Story
    user(id: String!): User
  }

  # represent Story
  type Story {
    id: ID!,
    title: String,
    url: String,
    comments: [Comment]
    user: User
  }

  # represent Comment
  type Comment {
    id: ID!,
    text: String,
    comments: [Comment]
    user: User
  }

  type User {
    id: ID!,
    about: String,
    karma: Int
    items: [UserItems]
  }

  union UserItems = Comment | Story | Job

  type Job {
    id: ID!,
    title: String,
    url: String,
    user: User
  }

`;

const resolvers = {
  Query: {
    topStories: async (_, {first=10}) => {
      let list = await getTopStories()
      list = list.slice(0, first);
      return list.map( id => getItem(id))
    },
    story: (_, {id}) => getItem(id),
    user: (_, { id }) => getUser(id)
  },
  Story: {
    comments: (story) => {
      let kids = story.kids || []
      return kids.map(id => getItem(id))
    },
    user: (story) => getUser(story.by),
    __isTypeOf: (comment) => comment.type === 'story'
  },
  Comment: {
    comments: (comment) => {
      let kids = comment.kids || []
      return kids.map(id => getItem(id))
    },
    user: (comment) => getUser(comment.by),
    __isTypeOf: (comment) => comment.type === 'comment'
  },
  User: {
    items: async (user) => {
      let list = user.submitted.slice(0, 10);
      return list.map( id => getItem(id))
    }
  },
  Job: {
    user: (job) => getUser(job.by),
    __isTypeOf: (comment) => comment.type === 'job'
  }
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default executableSchema;
