import express from 'express';
import asyncHandler from 'express-async-handler';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import schema from './schema'

const PORT=8080;

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled


app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})
