// import {ApolloServer,gql} from "apollo-server-express";

// // File này mình đã tối ưu trong file khác gồm Article và Category trong thư mục TypeDefs

// export const typeDefs = gql`

//     type Article {
//         id : ID,
//         title : String,
//         avatar : String,
//         description : String,
//         category: Category,
//     }

//     type Category {
//         id: ID,
//         title: String,
//         avatar: String
//     }

//     type Query { # query : Lấy ra truy vấn
//         hello: String,
//         getListArticle: [Article],
//         # Cho phep lay ra 1 id
//         getArticle(id: ID): Article, 
//         getListCategory: [Category],
//         getCategory(id: ID): Category
//     }

//     input ArticleInput { # Muốn tạo mới phải dùng từ khoá Input
//         title: String,
//         avatar: String,
//         description: String,
//         categoryId : String,
//     }
//     input CategoryInput {
//         title: String,
//         avatar: String,
//     }

//     type Mutation { #  Thêm sửa xoá truy vấn
//         createArticle(article: ArticleInput ) : Article,
//         deleteArticle(id :ID) : String,
//         updateArticle(id : ID,article: ArticleInput) : Article ,

//         createCategory(category: CategoryInput ) : Category,
//         deleteCategory(id :ID) : String,
//         updateCategory(id : ID,category: CategoryInput) : Category 
//     }

// `;