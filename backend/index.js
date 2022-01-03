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
            timeCount: Int!
            turns: Int!
        ): Score
    }
`;

const resolvers = {
    Query: {
        leaderboard: async (root, args) => await Score.find({}),
    },
    Mutation: {
        createUser: async (root, args) => {
            const isUserTaken = await User.findOne({ username: args.username });

            if(isUserTaken){
                throw new UserInputError(error.message, {
                    invalidArgs: args.username,
                });
            };

            const password1 = await bcrypt.hash(args.password, 10);
            const user = await new User({ username: args.username, passwordHash: password1 });

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

            const passwordCorrect = user === null ? false : await bcrypt.compare(args.password, user.passwordHash);

            if(!(user || passwordCorrect)){
                throw new UserInputError('invalid credentials');
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, config.SECRET) };
        },
        saveScore: async (root, args) => {
            const score = await new Score({ timeCount: args.timeCount, turns: args.turns });
            
            try {
                score.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                });
            };

            return score;
        }
    }
};

const server = new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if(auth && auth.toLoweCase().startsWith('bearer ')){
            const decodedToken = jwt.verify(auth.substring(7), config.SECRET);
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        };
    }
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
});