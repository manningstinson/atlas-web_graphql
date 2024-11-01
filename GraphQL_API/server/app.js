const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// Replace with your MongoDB Atlas connection string
mongoose.connect('mongodb+srv://atlas-fullstack: MYMrDv4ynAKajjl0@cluster0.20if9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
