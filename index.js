import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schemas/schema.js';
import db from './assets/_db.js';
const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        game(_, args, ctx) {
            return db.games.find(game => game?.id === args?.id);
        },
        reviews() {
            return db.reviews;
        },
        review(_, args, ctx) {
            return db.reviews.find(review => review?.id === args?.id);
        },

        authors() {
            return db.authors;
        },
        author(_, args, ctx) {
            return db.authors.find(author => author?.id === args?.id);
        },


    },
    Game: {
        reviews(parent, args, ctx) {
            return db.reviews.filter(review => review.game_id === parent?.id);
        }
    },
    Author: {
        reviews(parent, args, ctx) {
            return db.reviews.filter(review => review.author_id === parent?.id);
        }
    },
    Review: {
        author(parent, args, ctx) {
            return db.authors.find(author => author.id === parent?.author_id);
        },
        game(parent, args, ctx) {
            return db.games.find(game => game.id === parent?.game_id);
        }
    },
}

// Server Setup
// The ApolloServer constructor requires two parameters: 
// your schema definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs, // the definitions if types of data or we can say schema definitions
    resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 3434 },
});

console.log(`🚀  Server ready at: ${url}`);
