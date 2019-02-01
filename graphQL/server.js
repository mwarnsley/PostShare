const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

/**
 * Requiring in the typeDefs from the typeDefs file
 * typeDefs tell apollo about the types of data in the application
 */
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

// Requiring in the dotenv for using the private env variables
require('dotenv').config({ path: 'variables.env' });

// Accessing the current model Schemas that we have available to pass to Apollo Server
const User = require('./models/User');
const Post = require('./models/Post');

// Connecting mongoose
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error('Error connecting to database: ', err));

// Setting the port from the env or port 400
const PORT = process.env.PORT || 4000;

/**
 * Initializing the apollo server
 * Passing in the typeDefs for the types of data in the application
 * Passing in the context object using the models that we have available for the application
 * Passing in the resolver functions used inside of the application
 */
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User,
        Post
    }
});

/**
 * Listening for the apollo server
 * We can pass in the port we want to listen to or use the default port
 * Destructuring the URL out of the then callback function to get the port that we are listening on if one is not set by default
 */
server.listen(PORT).then(({ url }) => {
    console.log(`The Server is listening on port: ${url}`);
});
