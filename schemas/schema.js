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
    # https://www.apollographql.com/docs/apollo-server/schema/schema#the-mutation-type

    type Query {
        games: [Game]
        game(id:  ID!): Game

        reviews: [Review]
        review(id: ID!): Review

        authors: [Author]
        author(id: ID!): Author
    }
    # The Mutation type is similar in structure and purpose to the Query type. 
    # Whereas the Query type defines entry points for read operations, 
    # the Mutation type defines entry points for write operations.
    # https://www.apollographql.com/docs/apollo-server/schema/schema#the-mutation-type

    type Mutation {
        addGame(gameObj: AddGameInput!): Game,
        deleteGame(game_id: ID!): [Game]
        updateGame(id: ID!, edits: EditGameInput): Game
    }

    # Input types are special object types that allow you to provide hierarchical data 
    # as arguments to fields (as opposed to providing only flat scalar arguments).

    input AddGameInput{
        title:String, 
        platform:[String!]!
    }
    input EditGameInput{
        title:String, 
        platform:[String!]
    }
`;