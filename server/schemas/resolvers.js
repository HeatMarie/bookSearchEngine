const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id}).populate('savedBooks')
            }

        } 
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            
            if (!user) {
               console.log('User could not be created.');
            }

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new AuthenticationError("There is no User with this email.")
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect password!");
            }
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, args, context) => {
            console.log(args);
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args } },
                    { new: true, runValidators: true }
                    );
            }
            throw new AuthenticationError("Login required!");
        },

        removeBook: async (parent, args,) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user.id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                );
            }
            throw new AuthenticationError("Login required!")
        }
    }    


}

module.exports = resolvers;