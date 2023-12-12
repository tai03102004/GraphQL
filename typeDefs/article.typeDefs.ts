import {gql} from "apollo-server-express";

export const typeDefsArticle = gql`

    type Article {
        id : ID,
        title : String,
        avatar : String,
        description : String,
        category: Category,
    }

    type Query { # query : Lấy ra truy vấn
        hello: String,
        getListArticle: [Article],
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