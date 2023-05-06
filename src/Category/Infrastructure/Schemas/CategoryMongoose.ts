import { uuid } from "@deepkit/type";
import Category from "Category/Domain/Entities/Category";
import { ICategoryDomain } from "Category/Domain/Entities/ICategoryDomain";
import { Document, Schema } from "mongoose";

export type CategoryMongooseDocument = Document & ICategoryDomain

const CategorySchema: any = new Schema<Category>({
    _id: { 
        type: String, 
        default: uuid 
    },
    title: {
        type: String, 
        required: true, 
        unique: true
    },
    enable: {
        type: Boolean, 
        required: true
    }
})

CategorySchema.loadClass(Category)

export default CategorySchema