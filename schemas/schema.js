export const typeDefs = `#graphql
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    
    # possible types in GraphQL
        # int, float, string, boolean and ID
        # the symbol ! represents the required type, means can not be null value

    # This "Game" type defines the queryable fields for every game in our data source.
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }
   
    type Review{
        id: ID!
        rating: String!
        content: String!
        author: Author!
        game: Game!
    }

    type Author{
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    # entry points/ endpoints

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "games, reviews and authors" query returns an array of zero or more Games, Reviews and Authors (defined above).

    type Query {
        games: [Game]
        game(id:  ID!): Game

        reviews: [Review]
        review(id: ID!): Review

        authors: [Author]
        author(id: ID!): Author
    }
`;