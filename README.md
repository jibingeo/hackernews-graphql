# HackerNews GraphQL
This repo demostrate how to implement GraphQL sever from an exisitng REST API. 

## Getting Started
```sh
$ git clone https://github.com/jibingeo/hackernews-graphql
$ cd hackernews-graphql
$ npm install #OR yarn install
$ npm run start #OR yarn start
```

Then open http://localhost:8080/graphiql

Use below GQL query for testing
```gql
{
  topStories{
    title
    id
  }
}
```
