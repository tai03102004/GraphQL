import {gql} from "apollo-server-express";

export const typeDefsCategory = gql`

    type Category {
        id: ID,
        title: String,
        avatar: String
    }

    type Query { # query : Lấy ra truy vấn
        getListCategory: [Category],
        getCategory(id: ID): Category
    }

    input CategoryInput {
        title: String,
        avatar: String,
    }

    type Mutation { #  Thêm sửa xoá truy vấn
        createCategory(category: CategoryInput ) : Category,
        deleteCategory(id :ID) : String,
        updateCategory(id : ID,category: CategoryInput) : Category 
    }

`;