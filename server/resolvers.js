/**
 * Resolvers create the functionality for the query function
 * Query is used to query the data in the application
 * Mutations change or update the data in the application
 * @param { root or _ }
 * @param { args or destructured args}
 * @param { context or destructured context from Apollo }
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Creating a function to create a JWT token for us
 * @param { user } Object of the user being signed in or signed up
 * @param { secret } String that is a secret only to us using the application (Comes from ENV variable)
 * @param { expireIn } String denoting the amount of time that the token is valid for
 */
const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({ username, email }, secret, { expiresIn });
};

module.exports = {
    Query: {
        getCurrentUser: async (_, args, { User, currentUser }) => {
            if (!currentUser) {
                return null;
            }
            const { username } = currentUser;
            const user = await User.findOne({ username }).populate({
                path: 'favorites',
                model: 'Post'
            });

            return user;
        },
        getPosts: async (_, args, { Post }) => {
            const posts = await Post.find({})
                .sort({ createdDate: 'desc' })
                .populate({
                    path: 'createdBy',
                    model: 'User'
                });
            return posts;
        }
    },
    Mutation: {
        addPost: async (
            _,
            { title, imageUrl, categoires, description, creatorId },
            { Post }
        ) => {
            const newPost = await new Post({
                title,
                imageUrl,
                categoires,
                description,
                createdBy: creatorId
            }).save();

            return newPost;
        },
        signinUser: async (_, { username, password }, { User }) => {
            // Finding the user in the database
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }
            // Checking to see if the users password is valid
            const isValidPassword = await bcrypt.compare(
                password,
                user.password
            );
            if (!isValidPassword) {
                throw new Error('Invalid password');
            }

            return { token: createToken(user, process.env.SECRET, '1hr') };
        },
        signupUser: async (_, { username, email, password }, { User }) => {
            // Checking to make sure the user has not already signed up in the database
            const user = await User.findOne({ username });
            if (user) {
                throw new Error('User already exists');
            }
            // Creating the new user object and saving the user to the database
            const newUser = await new User({
                username,
                email,
                password
            }).save();

            return { token: createToken(newUser, process.env.SECRET, '1hr') };
        }
    }
};
