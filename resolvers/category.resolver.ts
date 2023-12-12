import Category from "../models/category.model";

export const resolversCategory = {
    Query: {
        hello: () => {
            return "Hello Word!";
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

    Mutation : {
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