const { AuthenticationError } = require("apollo-server-express");
const { Book, User } = require("../models");

const resolvers = {
  Query: {
    books: async (parents, args, context, info) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          -__v - password
        );
        return userData;
      }
      throw new AuthenticationError("Please Log in!");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Username Not Found");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Password");
      }

      const token = signToken(user);
      return { token, user };
    },

    savedBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const updateUSer = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You must Login first!");
    },
    removedBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You must Login first!");
    },
  },
};

module.exports = resolvers;
