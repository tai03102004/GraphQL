import {gql} from "apollo-server-express";

export const typeDefsUser = gql`

    type User {
        id: ID,
        fullName: String,
        email : String,
        password : String,
        token : String,
        code: Int,
        message: String,
    }

    input RegisterUserInput { # Muốn tạo mới phải dùng từ khoá Input
        fullName: String,
        email: String,
        password: String,
    }
    input LoginUserInput { # Muốn tạo mới phải dùng từ khoá Input
        email: String,
        password: String,
    }

    type Mutation { #  Thêm sửa xoá truy vấn
        registerUser(user: RegisterUserInput ) : User,
        loginUser(user: LoginUserInput ) : User
    }

`;