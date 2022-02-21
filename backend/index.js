const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server');
const config = require('./config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Score = require('./models/score');
const bcrypt = require('bcrypt');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    id: ID!
  }

  type Score {
    timeCount: Int!
    turns: Int!
		difficulty: String!
    user: User!
  }

  type Token {
    value: String!
  }

  type Query {
    leaderboard: [Score]
    currentUser: User
  }

  type Mutation {
    createUser(
      username: String!
      password: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    saveScore(
			difficulty: String!
      timeCount: Int!
      turns: Int!
    ): Score
  }
`;

const resolvers = {
  Query: {
    leaderboard: async (root, args) => await Score.find({}).populate('user', { username: 1}),
    currentUser: async (root, args) => await User.find({ username: args.username }).populate('score', { timeCount: 1, turns: 1, username: 1, difficulty: 1 })
  },
  Mutation: {
    createUser: async (root, args) => {
      const isUserTaken = await User.findOne({ username: args.username });

      if(isUserTaken){
        throw new UserInputError(error.message, {
          invalidArgs: args.username,
        });
      };
      
      const passwordHash = await bcrypt.hash(args.password, 10);
      const user = await new User({ username: args.username, passwordHash: passwordHash });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      };

      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if(!user){
        throw new UserInputError('No such user found');
      };

      const passwordCorrect = await bcrypt.compare(args.password, user.passwordHash);

      if(!passwordCorrect){
        throw new UserInputError('incorrect password');
      };

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, config.SECRET) };
    },
    saveScore: async (root, args, { currentUser }) => {
      if(!currentUser){
        throw new AuthenticationError("not authenticated")
      };
      const score = await new Score({ difficulty: args.difficulty, timeCount: args.timeCount, turns: args.turns, user: currentUser });
      try {
        score.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      };

      return score;
    },
  }
};

const server = new ApolloServer({
  introspection: process.env.NODE_ENV === 'production' ? false : true,
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
});