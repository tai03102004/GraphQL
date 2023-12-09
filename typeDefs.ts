import {ApolloServer,gql} from "apollo-server-express";

export const typeDefs = gql`

    type Article {
        id : ID,
        title : String,
        avatar : String,
        description : String,

    }

    type Query {
        hello: String,
        getListArticle: [Article],
        # Cho phep lay ra 1 id
        getArticle(id: ID): Article, 
    }
`;