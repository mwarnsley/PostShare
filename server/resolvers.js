/**
 * Resolvers create the functionality for the query function
 * Query is used to query the data in the application
 * Mutations change or update the data in the application
 * @param { root or _ }
 * @param { args or destructured args}
 * @param { context or destructured context from Apollo }
 */

const bcrypt = require('bcrypt');

module.exports = {
    Query: {
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
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }

            const isValidPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!isValidPassword) {
                throw new Error('Invalid password');
            }

            return user;
        },
        signupUser: async (_, { username, email, password }, { User }) => {
            const user = await User.findOne({ username });
            if (user) {
                throw new Error('User already exists');
            }
            const newUser = await new User({
                username,
                email,
                password
            }).save();

            return newUser;
        }
    }
};
