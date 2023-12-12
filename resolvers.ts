import Article from "./models/article.model";
import Category from "./models/category.model";

export const resolvers = {
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

        // Category
        getListCategory : async () => {
            const categories = await Category.find({
                deleted : false
            })
            return categories;
        },
        getCategory : async (_, args) => {
            const {id} = args; 
            const category = await Category.findOne({
                _id :id ,
                deleted : false
            })
            return category;
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
        // Category
        createCategory : async (_,args) => {
            const { category } = args;
            const recordCategories = new Category(category);
            await recordCategories.save();
            return recordCategories;
        },
        deleteCategory : async(_,args) => {
            const {id} = args;
            await Category.updateOne({
                _id : id, 
            },{
                deleted : false,
                deletedAt: new Date(),
            }
                
            )
            return "Da xoa";
        },
        updateCategory : async(_,args) => {
            const {id,category} = args;
            await Category.updateOne({
                _id : id,
                deleted: false,
            },category);
            const record = await Category.findOne({_id: id});
            return record;
        }
    }
};