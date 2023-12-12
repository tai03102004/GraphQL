import mongoose from "mongoose";
// import {generateRandomString} from "../helpers/generateRandomString";

const userSchema = new mongoose.Schema(
    {
        fullName : String,
        email : String,
        password : String,
        token : String,
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema, "users");

export default User;