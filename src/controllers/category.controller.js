import { Category } from "../models/category.models.js";

export const getAllCategories = async(ctx) => {
    const categories = await Category.find()
    ctx.body = categories
}

export const newCategory = async(ctx) => {
    try {
        const { title, enable } = ctx.request.body;
        const category = new Category({
            title: title,
            enable: enable
        })
        const savedCategory = await category.save()
        ctx.status = 201
        ctx.body = savedCategory
    } catch (error) {
        ctx.throw(500, error);
    }
}
