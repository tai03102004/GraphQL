import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
    Query: {
        hello: () => {
            return "Hello Word!";
        },
        // Article
        getListArticle : async (_ , args) => {
            const {
                sortKey,
                sortValue,
                currentPage,
                limitItems,
                filterKey,
                filterValue,
                keyword,
            } = args;

            const find = {
                deleted : false,
            }

            // Sort
            // Sắp xếp sortKey theo 2 kiểu asc , desc
            const sort = {};
            if (sortKey && sortValue) {
                sort[sortKey] = sortValue;
            }

            // End Sort

            // Pagination

            const skip = (currentPage - 1) * limitItems; // Bỏ qua chỉ hiên các trang hiện tại

            // End Pagination

            // Filter

            if (filterKey && filterValue) {
                find[filterKey] = filterValue;
            }

            // End Filter

            // Search

            if (keyword) {
                const keywordRegexp = new RegExp(keyword,"i");
                find["title"] = keywordRegexp;
            }

            // End Search

            const articles = await Article. 
                find(find).
                sort(sort).
                limit(limitItems).
                skip(skip);

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