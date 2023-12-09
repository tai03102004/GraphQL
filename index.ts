import express, {Express,Request,Response} from 'express';
import dotenv from 'dotenv';

import * as database from "./config/database";

import Article from "./models/article.model";

dotenv.config();

database.connect();

const app : Express = express();
const port: number | string = process.env.port || 3000;

// Rest api

app.get("/articles" , async (req: Request, res: Response)  => {

    const articles = await Article.find ({
        deleted : false,
    });

    res.json ({
        articles: []
    });

});

app.listen (port ,()  => {
    console.log(`App listening on port ${port}`);
});
