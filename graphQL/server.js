const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

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
const todos = [
    { task: 'Wash Car', completed: false },
    { task: 'Pay Bills', completed: false },
    { task: 'Clean Room', completed: false },
    { task: 'Shower', completed: false }
];

/**
 * The way to tell the apollo server about the different types of data in your application
 * The type is a Todo from the array of todos
 * @param {task} String
 * @param {completed} Boolean
 * Query is a built in type defintion for querying
 * Mutation is a built in type defintion used to change data
 */
const typeDefs = gql`
    type Todo {
        task: String
        completed: Boolean
    }
    type Query {
        getTodos: [Todo]
    }
    # type Mutation {
    #     addTodo(task: String, completed: Boolean): Todo
    # }
`;

/**
 * Resolvers create the functionality for the query function
 * Query responds to the Query type in the typedefs
 * getTodos function is the function that returns the todos
 * Mutation responds to the mutation type in the typeDefs
 * addTodo adds a todo to the list @param { root, args }
 */
// const resolvers = {
//     Query: {
//         getTodos: () => todos
//     },
//     Mutation: {
//         addTodo: (_, { task, completed }) => {
//             const todo = {
//                 task,
//                 completed
//             };
//             todos.push(todo);
//             return todo;
//         }
//     }
// };

/**
 * Initializing the apollo server
 * Passing in the typeDefs for the types of data in the application
 * Passing in the context object using the models that we have available for the application
 * Passing in the resolver functions used inside of the application
 */
const server = new ApolloServer({
    typeDefs,
    context: {
        User,
        Post
    }
    // resolvers
});

/**
 * Listening for the apollo server
 * We can pass in the port we want to listen to or use the default port
 * Destructuring the URL out of the then callback function to get the port that we are listening on if one is not set by default
 */
server.listen(PORT).then(({ url }) => {
    console.log(`The Server is listening on port: ${url}`);
});
