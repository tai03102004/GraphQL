import Article from "./models/article.model";

export const resolvers = {
    Query: {
        hello: () => {
            return "Hello Word!";
        },
        getListArticle : async () => {
            const articles = await Article.find({
                deleted : false
            });

            return articles;
        },
        getArticle : async (_ , args) => { 
            const {id} = args; // Cú pháp phá vỡ cấu trúc => Lấy ra id
            const article = await Article.findOne({
                _id : id,
                deleted : false
            })
            return article;
        }
    }
};