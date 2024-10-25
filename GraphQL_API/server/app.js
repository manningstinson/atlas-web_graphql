const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema'); // Adjust the path as necessary

const app = express();

// Set up GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema, // Pass the schema here
  graphiql: true, // Enable GraphiQL for testing queries
}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
