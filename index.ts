import express, {Express} from 'express';
import dotenv from 'dotenv';

import * as database from "./config/database";

import {ApolloServer} from "apollo-server-express";

import {typeDefs} from "./typeDefs/index.typeDefs";

import {resolvers} from "./resolvers/index.resolver";
import { requireAuth } from './middlewares/auth.middleware';

dotenv.config();

database.connect();

const app : Express = express();
const port: number | string = process.env.port || 3000;

// GraphQL

app.use("/graphql",requireAuth);

// Rest api

// app.get("/articles" , async (req: Request, res: Response)  => {

//     const articles = await Article.find ({
//         deleted : false,
//     });

//     res.json ({
//         articles: []
//     });

// });

const startServer = async () => {

    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers : resolvers,
        context: ({req}) => {
            return { ... req};
        }
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app: app,
        path: "/graphql"
    });

    app.listen (port ,()  => {
        console.log(`App listening on port ${port}`);
    });
};

startServer();

