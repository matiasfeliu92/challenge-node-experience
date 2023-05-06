import { IProductDomain } from "Product/Domain/Entities/IProductDomain";
import mongoose, { Document, Schema } from "mongoose";

export type ProductMongooseDocument = Document & IProductDomain

const ProductSchema: any = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    enable: {
        type: Boolean,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
})