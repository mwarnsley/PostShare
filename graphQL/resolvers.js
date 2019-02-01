/**
 * Resolvers create the functionality for the query function
 * Query is used to query the data in the application
 * Mutations change or update the data in the application
 * @param { root or _ }
 * @param { args or destructured args}
 * @param { context or destructured context from Apollo }
 */

module.exports = {
    Query: {
        getUser: () => console.log('User')
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
