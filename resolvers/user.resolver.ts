import { generateRandomString } from "../helpers/generate";
import User from "../models/user.model";

import md5 from "md5";

export const resolversUser = {
        
    Mutation : {
        // User
        
        registerUser : async (_,args) => { 
            const {user} = args;

            const emailExist = await User.findOne({
                email : user.email,
                deleted: false,
            });

            if (emailExist) {
                return {
                    code : 400,
                    message: "Email already exists",
                }
            } else {
                user.password = md5(user.password);
                user.token = generateRandomString(30);
                const newUser = new User(user);

                const data = await newUser.save();

                return {
                    code : 200,
                    message : "Success",
                    id: data.id,
                    fullName: data.fullName ,
                    email: data.email,
                    token: data.token,
                }

            }
        },
        loginUser : async (_,args) => {

            const { email,password } = args.user;

            // Kiểm tra có tồn tại email và password
            
            const infoUser = await User.findOne({
                email : email,
                deleted : false,
            });

            if (!infoUser) {
                return {
                    code: 400,
                    message: "User not found",
                }
            }

            if (md5(password) !== infoUser.password) {
                return { 
                    code: 400,
                    messgae:"Password is incorrect",
                }
            }

            return {
                code: 200,
                message: "Success",
                id: infoUser.id,
                fullName: infoUser.fullName,
                email: infoUser.email,
                token : infoUser.token,
            }

        }

    }
};