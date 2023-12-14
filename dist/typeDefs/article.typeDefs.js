"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsArticle = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsArticle = (0, apollo_server_express_1.gql) `

    type Article {
        id : ID,
        title : String,
        avatar : String,
        description : String,
        category: Category,
    }

    type Query { # query : Lấy ra truy vấn
        hello: String,
        getListArticle(
            sortKey:String, 
            sortValue: String,
            currentPage: Int = 1,
            limitItems: Int = 2,
            filterKey: String ,
            filterValue: String,
            keyword: String,
        ): [Article],
        # Cho phep lay ra 1 id
        getArticle(id: ID): Article, 

    }

    input ArticleInput { # Muốn tạo mới phải dùng từ khoá Input
        title: String,
        avatar: String,
        description: String,
        categoryId : String,
    }

    type Mutation { #  Thêm sửa xoá truy vấn
        createArticle(article: ArticleInput ) : Article,
        deleteArticle(id :ID) : String,
        updateArticle(id : ID,article: ArticleInput) : Article ,

    }

`;
