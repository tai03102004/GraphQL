import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
    Query: {
        hello: () => {
            return "Hello Word!";
        },
        // Article
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
        },    
    },
    Article: {
        category: async (article) => {
            const categoryId = article.categoryId;
        
            const category = await Category.findOne({
                _id: categoryId
            });
    
            return category;
        }
    },
    Mutation : {
        // Article
        createArticle : async (_,args) => {
            const { article } = args;

            const recordArticles = new Article(article);

            await recordArticles.save();

            return recordArticles;
        },
        deleteArticle : async (_,args) => {
            const { id } = args;
            await Article.updateOne({
                _id : id,
            },{
                deleted: true,
                deletedAt: new Date(),
            });

            return "Đã xoá";
        },

        updateArticle: async (_, args) => {
            const { id, article } = args;
    
            await Article.updateOne({
                _id: id,
                deleted: false
            }, article);
    
            const record = await Article.findOne({
                _id: id
            });
    
            return record;
        },
    }
};