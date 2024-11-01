const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB Atlas with improved options
mongoose.connect('mongodb+srv://atlas-fullstack:uVMkzkaGbCILTPkJ@cluster0.20if9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    }
})
.then(() => {
    console.log("Successfully connected to MongoDB!");
})
.catch(err => {
    console.error('Database connection error:', err);
});

// Add connection error handler
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

// GraphQL middleware
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});